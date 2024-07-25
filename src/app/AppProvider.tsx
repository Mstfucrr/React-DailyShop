'use client'
import Topbar from '@/components/Topbar'
import Searchbar from '@/components/Searchbar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import reactQueryConfig from '@/configs/react-query-config'
import SiteIcon from '@/components/icon'

export function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={reactQueryConfig}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <SiteIcon />
        <Topbar />
        <Searchbar />
        <Navbar />
        {children}
        <Toaster position='top-right' />
        <Footer />
      </AuthProvider>
    </QueryClientProvider>
  )
}
