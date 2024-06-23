import React, { useCallback } from 'react'
import { Input, InputField, Icon, AddIcon, RemoveIcon, Pressable } from '@gluestack-ui/themed'
export interface QuantityViewProps<F = () => void> {
  quantity: number
  onPressIncrement?: F
  onPressDecrement?: F
  onChangeQuantity?: (text: string) => void
  onEditQuantityEnd?: F
}
function QuantityView ({ quantity = 1, onPressIncrement, onPressDecrement, onChangeQuantity, onEditQuantityEnd }: QuantityViewProps): JSX.Element {
  const handleOnChangeQuantity = useCallback((text: string): void => {
    onChangeQuantity?.(text)
  }, [])

  return (
    <Input
      borderWidth='$0'
      h={20}
      w={60}
      mr='$3'
    >
      <Pressable onPress={onPressIncrement}>
        <Icon as={AddIcon} size='lg' color='$green500' />
      </Pressable>
      <InputField
        value={quantity.toString()}
        color='$textDark50'
        fontSize='$sm'
        fontWeight='$normal'
        autoComplete='off'
        padding={0}
        px='$0'
        keyboardType='numeric'
        textAlign='center'
        maxLength={2}
        onChangeText={handleOnChangeQuantity}
        onBlur={onEditQuantityEnd}
      />
      <Pressable onPress={onPressDecrement}>
        <Icon as={RemoveIcon} size='lg' color='$red500' />
      </Pressable>
    </Input>
  )
}

export default React.memo(QuantityView)
