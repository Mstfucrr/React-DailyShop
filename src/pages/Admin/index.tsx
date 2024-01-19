import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Messages } from 'primereact/messages'
import { authSelector } from '@/store/auth'
import UnAuthorized from '@/components/error/unAuthorized'
import Admin from '@/components/admin/admin'

const Index = () => {
  const msgs = useRef<Messages>(null)
  const selector = useSelector(authSelector)

  useEffect(() => {
    if (!selector.isAdminAuthorized) {
      msgs.current?.clear()
      msgs.current?.show({
        severity: 'error',
        sticky: true,
        closable: false,
        content: <h3 className='text-2xl'>Yetkisiz Erişim</h3>
      })
    }
  }, [selector.isAdminAuthorized])

  return <>{selector.isAdminAuthorized ? <Admin /> : <UnAuthorized msgs={msgs} />}</>
}

export default Index
