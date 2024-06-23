import StyledScrollView from '../../../StyledScrollView'
import { Spinner } from '@gluestack-ui/themed'
import React from 'react'

export interface GroceryListProps<T> {
  data?: T[]
  renderItem: (item: T) => React.ReactNode
  isLoading?: boolean
}
function GroceryList<T> ({ data, renderItem, isLoading = false }: GroceryListProps<T>): JSX.Element {
  return (
    <StyledScrollView
      flex={0}
      flexGrow={0}
      flexShrink={0}
      px='$4'
      mt='$6'
      bg='$backgroundDark900'
      $base-w='$full'
      flexDirection='column'
      maxHeight='85%'
    >
      {isLoading && <Spinner size='large' />}
      {data?.map(renderItem)}
    </StyledScrollView>
  )
}

export default React.memo(GroceryList) as typeof GroceryList
