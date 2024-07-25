import { QueryClient } from '@tanstack/react-query'

export default new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'online',
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})
