import React from 'react'
import StyledSafeAreaView from '../components/StyledSafeAreaView'
import { View } from '@gluestack-ui/themed'

export default function screenHoc<P extends React.JSX.IntrinsicAttributes> (WrappedComponent: React.FC<P>, useSafeAreaView = true) {
  return function (props: P): JSX.Element {
    const StyledContainer = useSafeAreaView ? StyledSafeAreaView : View

    return (
      <StyledContainer
        $base-bg='$backgroundDark900'
        $md-bg='$black'
        w='$full'
        h='$full'
      >
        <WrappedComponent {...props} />
      </StyledContainer>
    )
  }
}
