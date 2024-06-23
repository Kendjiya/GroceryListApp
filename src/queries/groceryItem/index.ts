import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query'
import type { IGroceryItem, TGroceryItemNoId } from '../../types/GroceryItem'
import GroceryService from '../../services/GroceryService'
import queryClient from '../client'
import { AtLeastOne } from '../../types/utility/AtLeastOne'

export const useGroceryItems = (): UseQueryResult<IGroceryItem[], Error> => {
  return useQuery({ queryKey: ['items'], queryFn: async () => await GroceryService.fetchGroceryList() })
}

export const useAddGroceryItem = (): UseMutationResult<Omit<IGroceryItem, 'id'>, Error, Omit<IGroceryItem, 'id'>> => {
  return useMutation({
    mutationFn: async (newItem) => {
      return await GroceryService.addItem(newItem)
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['items'] })

      const previousItems = queryClient.getQueryData(['items'])

      queryClient.setQueryData(['items'], (oldItems: IGroceryItem[]) => [...oldItems, newItem])

      return { previousItems }
    },
    onError: (err, newItem, context) => { // rollback on error
      console.log(err, newItem, context)
      queryClient.setQueryData(['items'], context?.previousItems)
    },
    onSettled: async () => { // invalidate queries on error or success
      await queryClient.invalidateQueries({
        queryKey: ['items']
      })
    }
  })
}

export const useUpdateGroceryItem = (): UseMutationResult<IGroceryItem, Error, { id: string, data: AtLeastOne<TGroceryItemNoId> }> => {
  return useMutation({
    mutationFn: async (updatedItem) => {
      return await GroceryService.updateItem(updatedItem.id, updatedItem.data)
    },
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: ['items'] })

      const previousItems: IGroceryItem[] = queryClient.getQueryData(['items']) ?? []
      const previousItem = previousItems.find((item) => item.id === updatedItem.id)
      const newItem = { ...previousItem, ...updatedItem.data }
      const newItems = previousItems.map((item) => (item.id === updatedItem.id ? newItem : item))

      queryClient.setQueryData(['items'], newItems)

      return { previousItems, newItems }
    },
    onError: (err, newItems, context) => { // rollback on error
      console.log(err, newItems, context)
      queryClient.setQueryData(['items'], context?.previousItems)
    },
    onSettled: async (newItem) => { // invalidate queries on error or success
      await queryClient.invalidateQueries({ queryKey: ['items']})
    }
  })
}

export const useDeleteGroceryItem = (): UseMutationResult<IGroceryItem, Error, string> => {
  return useMutation({
    mutationFn: async (id) => {
      return await GroceryService.deleteItem(id)
    },
    onMutate: async (deletedItemId) => {
      await queryClient.cancelQueries({ queryKey: ['items'] })

      const previousItems = queryClient.getQueryData(['items'])

      queryClient.setQueryData(['items'], (oldItems: IGroceryItem[]) => [...oldItems.filter((item) => item.id !== deletedItemId)])

      return { previousItems }
    },
    onError: (err, deletedItemId, context) => { // rollback on error
      console.log(err, deletedItemId, context)
      queryClient.setQueryData(['items'], context?.previousItems)
    },
    onSettled: async () => { // invalidate queries on error or success
      await queryClient.invalidateQueries({
        queryKey: ['items']
      })
    }
  })
}
