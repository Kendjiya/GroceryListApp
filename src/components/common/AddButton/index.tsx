import React from 'react'
import {
  HStack,
  Text,
  Pressable,
  Icon,
  AddIcon
} from '@gluestack-ui/themed'

interface AddButtonProps {
  onPress: () => void
  children?: string
}

function AddButton ({ onPress, children = '' }: AddButtonProps): JSX.Element {
  return (
    <Pressable
      px='$4'
      mb='$3'
      $md-mb={0}
      onPress={onPress}
      $active={{ opacity: 0.7 }}
    >
      <HStack alignItems='center' mt='$4'>
        <Icon as={AddIcon} color='$blue500' />
        <Text ml='$2' fontSize='$sm' color='$textDark50'>
          {children}
        </Text>
      </HStack>
    </Pressable>
  )
}

export default React.memo(AddButton)
