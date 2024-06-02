import { AuthProvider } from '@/context/AuthContext'
import type { Metadata } from 'next'
import { AppProvider } from './AppProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Daily Shop',
  description: 'Your one stop shop for daily essentials.',
  icons: 'vite.svg',
  category: 'e-commerce, shop, daily, essentials',
  keywords: 'e-commerce, shop, daily, essentials, daily shop, shop, essentials',
  robots: 'index, follow'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <AppProvider>{children}</AppProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
