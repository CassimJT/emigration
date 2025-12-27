// src/providers/QueryClientProvider.jsx
import { QueryClientProvider as TanstackProvider } from '@tanstack/react-query'
import { createQueryClient } from '../lib/queryClient'

const queryClient = createQueryClient()

export function QueryClientProvider({ children }) {
  return (
    <TanstackProvider client={queryClient}>
      {children}
    </TanstackProvider>
  )
}
