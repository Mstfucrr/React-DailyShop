import { Button } from 'primereact/button'
import { useCallback } from 'react'
import { Avatar } from 'primereact/avatar'
import { IUser } from '@/services/auth/types'
import { motion } from 'framer-motion'
import ReportedReviews from './reported-reviews'
import ReportedUsers from './reported-users'

const Reports = () => {
  const renderRepUserPanel = (user: IUser) => {
    return (
      <div className='flex flex-row flex-wrap gap-3'>
        <Avatar image={user.profileImage} size='large' shape='circle' className='mr-3 mt-2' />
        <div className='flex flex-wrap'>
          <span> {user.name + ' ' + user.surname + ' (' + user.email + ') '}</span>
          <a href={`http://localhost:5173/admin/users?userId=${user.id}`} target='_blank' className='text-blue-500'>
            Kullanıcıyı Görüntüle
          </a>
        </div>
      </div>
    )
  }

  const refreshButton = useCallback(
    (refreshFunction: () => Promise<void>) => (
      <motion.div
        className='my-3 flex justify-end'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <Button
          label='Yenile'
          icon='pi pi-refresh'
          rounded
          raised
          text
          className='!bg-white'
          onClick={refreshFunction}
        />
      </motion.div>
    ),
    []
  )

  // Render admin data
  return (
    <div className='flex w-full flex-col gap-4'>
      <ReportedUsers refreshButton={refreshButton} renderRepUserPanel={renderRepUserPanel} />
      <ReportedReviews refreshButton={refreshButton} renderRepUserPanel={renderRepUserPanel} />
    </div>
  )
}

export default Reports
