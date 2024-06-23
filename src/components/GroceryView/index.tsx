import AddButton from '../common/AddButton'
import GroceryItem from './components/GroceryItem'
import GroceryList, { GroceryListProps } from './components/GroceryList'
import StyledKeyboardAvoidingView from '../../components/StyledKeyboardAvoidingView'
import { useAddGroceryItem, useDeleteGroceryItem, useGroceryItems, useUpdateGroceryItem } from '../../queries/groceryItem'
import { useCallback } from 'react'
import type { TGroceryItemNoId, IGroceryItem } from '../../types/GroceryItem'
import type { AtLeastOne } from '../../types/utility/AtLeastOne'

export default function GroceryView (): JSX.Element {
  const { data, isLoading } = useGroceryItems()
  const addItemMutation = useAddGroceryItem()
  const deleteItemMutation = useDeleteGroceryItem()
  const updateItemMutation = useUpdateGroceryItem()
  const deleteGroceryItem = useCallback((id: string): void => {
    deleteItemMutation.mutate(id)
  }, [])
  const addGroceryItem = useCallback((): void => {
    addItemMutation.mutate({ name: '', bought: false, quantity: 1 })
  }, [])
  const updateGroceryItem = useCallback((id: string, propsToUpdate: AtLeastOne<TGroceryItemNoId>): void => {
    updateItemMutation.mutate({ id, data: { ...propsToUpdate } })
  }, [])
  const renderItem = useCallback((item) => {
    return (
      <GroceryItem
        key={item.id}
        onToggle={updateGroceryItem}
        onEditNameEnd={updateGroceryItem}
        onPressDelete={deleteGroceryItem}
        onPressIncrement={updateGroceryItem}
        onPressDecrement={updateGroceryItem}
        onEditQuantityEnd={updateGroceryItem}
        {...item}
      />
    )
  }, [data, isLoading]) as GroceryListProps<IGroceryItem>['renderItem']

  return (
    <StyledKeyboardAvoidingView
      w='$full'
      h='$full'
      bg='$backgroundDark900'
      behavior='padding'
      keyboardVerticalOffset={15}
    >
      <GroceryList<IGroceryItem>
        isLoading={isLoading}
        data={data}
        renderItem={renderItem}
      />
      <AddButton onPress={addGroceryItem}>Add Grocery Item</AddButton>
    </StyledKeyboardAvoidingView>
  )
}
