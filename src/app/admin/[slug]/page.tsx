'use client'
import UnAuthorized from '@/components/error/unAuthorized'
import Admin from '@/components/admin/admin'
import { useAuth } from '@/hooks/useAuth'
import { UserProvider } from '@/context/admin/UserContext'

export default function AdminPageComp({ params }: Readonly<{ params: { slug: string } }>) {
  const { isAdminAuthorized } = useAuth()
  return <UserProvider>{isAdminAuthorized ? <Admin pathName={params.slug} /> : <UnAuthorized />}</UserProvider>
}
