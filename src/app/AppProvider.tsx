'use client'
import Topbar from '@/components/Topbar'
import Searchbar from '@/components/Searchbar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import to from 'await-to-js'
import { getSiteIcon } from '../services/siteIcon/siteIcon'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

export function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const fetchAndUpdateSiteIcon = async () => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    const [err, data] = await to(getSiteIcon())
    if (err) return console.log(err)
    if (data) link?.href && (link.href = data.data)
  }

  useEffect(() => {
    fetchAndUpdateSiteIcon()
  }, [])
  return (
    <AuthProvider>
      <Topbar />
      <Searchbar />
      <Navbar />
      {children}
      <Toaster position='top-right' />
      <Footer />
    </AuthProvider>
  )
}
