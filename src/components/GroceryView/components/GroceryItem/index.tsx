import React, { useCallback, useState } from 'react'
import {
  Input,
  InputField,
  Checkbox,
  CheckIcon,
  Icon,
  TrashIcon,
  Pressable,
  HStack
} from '@gluestack-ui/themed'
import type { TGroceryItemNoId, TGroceryItemOptionalId } from '../../../../types/GroceryItem'
import QuantityView, { type QuantityViewProps } from '../../../common/QuantityView'

type QuantityEventHandlerFn = (id: string, propToUpdate: Pick<TGroceryItemNoId, 'quantity'>) => void

type GroceryItemProps = TGroceryItemOptionalId & QuantityViewProps<QuantityEventHandlerFn> & {
  onToggle?: (id: string, propToUpdate: Pick<TGroceryItemNoId, 'bought'>) => void
  onEditNameEnd?: (id: string, propToUpdate: Pick<TGroceryItemNoId, 'name'>) => void
  onPressDelete?: (id: string) => void
}

function GroceryItem ({ id = '', bought = false, name, quantity, onToggle, onEditNameEnd, onEditQuantityEnd, onPressDelete, onPressDecrement, onPressIncrement }: GroceryItemProps): JSX.Element {
  const [tmpName, setTmpName] = useState(name)
  const [tmpQuantity, setTmpQuantity] = useState(quantity)
  const handleOnPressDecrement = useCallback(() => {
    let newQuantity = tmpQuantity - 1

    if (newQuantity < 1) {
      newQuantity = 1
    }

    onPressDecrement?.(id, { quantity: newQuantity })
    setTmpQuantity(newQuantity)
  }, [id, tmpQuantity])
  const handleOnPressIncrement = useCallback(() => {
    let newQuantity = tmpQuantity + 1

    if (newQuantity > 99) {
      newQuantity = 99
    }

    onPressIncrement?.(id, { quantity: newQuantity })
    setTmpQuantity(newQuantity)
  }, [id, tmpQuantity])
  const handleOnEditQuantityEnd = useCallback(() => {
    onEditQuantityEnd?.(id, { quantity: tmpQuantity })
    setTmpQuantity(tmpQuantity)
  }, [id, tmpQuantity])
  const handleOnBlur = useCallback(() => {
    if (tmpName !== name) {
      onEditNameEnd?.(id, { name: tmpName })
    }
  }, [id, tmpName, name])
  const handleOnToggle = useCallback(() => {
    onToggle?.(id, { bought: !bought })
  }, [id, bought])
  const handleOnPressDelete = useCallback(() => {
    onPressDelete?.(id)
  }, [id])
  const handleOnChangeText = useCallback((text: string) => {
    setTmpName(text)
  }, [])
  const handleOnChangeQuantity = useCallback((text: string) => {
    let newQuantity = parseInt(text)

    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1
    }

    setTmpQuantity(newQuantity)
  }, [])

  return (
    <HStack mb='$3'>
      <Checkbox
        size='md'
        borderColor='transparent'
        aria-label='edit/delete grocery item'
        isChecked={bought}
        value={name}
        onChange={handleOnToggle}
      >
        <Checkbox.Indicator>
          <Checkbox.Icon color='$backgroundDark900' as={CheckIcon} />
        </Checkbox.Indicator>
      </Checkbox>
      <Input
        borderWidth='$0'
        flex={1}
        height={20}
      >
        <InputField
          value={tmpName}
          color='$textDark50'
          fontSize='$sm'
          fontWeight='$normal'
          textDecorationLine={bought ? 'line-through' : 'none'}
          onChangeText={handleOnChangeText}
          onBlur={handleOnBlur}
          autoComplete='off'
          placeholder='Enter grocery item name...'
          padding='$0'
        />
      </Input>
      <QuantityView
        quantity={tmpQuantity}
        onPressIncrement={handleOnPressIncrement}
        onPressDecrement={handleOnPressDecrement}
        onChangeQuantity={handleOnChangeQuantity}
        onEditQuantityEnd={handleOnEditQuantityEnd}
      />
      <Pressable onPress={handleOnPressDelete}>
        <Icon as={TrashIcon} size='lg' color='$red600' />
      </Pressable>
    </HStack>
  )
}

export default React.memo(GroceryItem)
