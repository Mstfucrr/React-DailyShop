import { useQuery } from '@tanstack/react-query'
import { publicAxiosInstance } from '../base/base'

type Contact = {
  data: {
    address: string
    phone: string
    email: string
  }
}

const getContact = async () => publicAxiosInstance.get<Contact>(`/Contacts`)

export const useGetContact = () =>
  useQuery({
    queryKey: ['getContact'],
    queryFn: () => getContact().then(res => res.data)
  })
