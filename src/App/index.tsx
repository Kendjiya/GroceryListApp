import React from 'react'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import GroceryScreen from '../screens/GroceryScreen'
import queryClient from '../queries/client'

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <GroceryScreen />
      </GluestackUIProvider>
    </QueryClientProvider>
  )
}
export { queryClient }
export default App
