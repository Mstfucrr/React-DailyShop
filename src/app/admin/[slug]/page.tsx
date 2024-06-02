// src\app\admin\[slug]\page.tsx
'use client'
import { useEffect, useRef } from 'react'
import { Messages } from 'primereact/messages'
import UnAuthorized from '@/components/error/unAuthorized'
import Admin from '@/components/admin/admin'
import { useAuth } from '@/hooks/useAuth'
import { UserProvider } from '@/context/admin/UserContext'

export default function AdminPageComp({ params }: Readonly<{ params: { slug: string } }>) {
  const msgs = useRef<Messages>(null)
  const { isAdminAuthorized } = useAuth()

  useEffect(() => {
    if (!isAdminAuthorized) {
      msgs.current?.clear()
      msgs.current?.show({
        severity: 'error',
        sticky: true,
        closable: false,
        content: <h3 className='text-2xl'>Yetkisiz Erişim</h3>
      })
    }
  }, [isAdminAuthorized])

  return (
    <UserProvider>{isAdminAuthorized ? <Admin pathName={params.slug} /> : <UnAuthorized msgs={msgs} />}</UserProvider>
  )
}
