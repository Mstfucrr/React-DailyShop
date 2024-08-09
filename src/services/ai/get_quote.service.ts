// flask apiye bağlantı
import { privateAxiosInstance } from '../base/base'
import { useMutation } from '@tanstack/react-query'

const base_url = process.env.REACT_APP_AI_SERVICE_URL
const get_quote = async (data: any) => await privateAxiosInstance.post<any>(`${base_url}/get_quote`, data)

const GetQuote = () =>
  useMutation({
    mutationKey: ['get_quote'],
    mutationFn: (data: any) => get_quote(data).then(res => res.data)
  })

export default GetQuote
