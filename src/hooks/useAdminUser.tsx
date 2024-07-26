import { UserContext } from '@/context/admin/UserContext'
import { useContext } from 'react'

export const useAdminUser = () => useContext(UserContext)
