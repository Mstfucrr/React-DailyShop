// flask apiye bağlantı
import axios from 'axios'
import { privateAxiosInstance } from '../base/base'
import { useMutation } from '@tanstack/react-query'

const base_url = 'http://127.0.0.1:5000'

// export const get_quote = async (data: any) => {
//   const response: any = await axios.post(`${base_url}/get_quote`, {
//     data: data
//   })
//   return await response.data
// }

const get_quote = async (data: any) => await privateAxiosInstance.post<any>(`${base_url}/get_quote`, data)

const GetQuote = () =>
  useMutation({
    mutationKey: ['get_quote'],
    mutationFn: (data: any) => get_quote(data).then(res => res.data)
  })

export default GetQuote
