import type { Metadata, Viewport } from 'next'
import { AppProvider } from './AppProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Daily Shop',
  description: 'Your one stop shop for daily essentials.',
  category: 'e-commerce, shop, daily, essentials',
  keywords: 'e-commerce, shop, daily, essentials, daily shop, shop, essentials',
  robots: 'index, follow',
  icons: '/favicon.ico'
}

export const viewport: Viewport = {
  themeColor: '#000000',
  initialScale: 1,
  width: 'device-width',
  height: 'device-height'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
