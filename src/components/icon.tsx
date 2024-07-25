'use client'
import { useEffect } from 'react'
import { useGetSiteIcon } from '@/services/siteIcon/siteIcon.service'
import { usePathname } from 'next/navigation'

const SiteIcon = () => {
  const { data } = useGetSiteIcon()
  const pathName = usePathname()

  const fetchSiteIcon = () => {
    if (data) {
      document.querySelector('link[rel="icon"]')?.setAttribute('href', data?.data.data)
      localStorage.setItem('siteIcon', data?.data.data)
    }
  }

  useEffect(() => {
    fetchSiteIcon()
  }, [data, pathName])
  return null
}

export default SiteIcon
