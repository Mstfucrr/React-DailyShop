import { useQuery } from '@tanstack/react-query'
import { publicAxiosInstance } from '../base/base'
import { ICategory } from '@/shared/types'
import { AxiosResponse } from 'axios'

export const fetchCategories = async (): Promise<AxiosResponse<ICategory[]>> =>
  await publicAxiosInstance.get('/Categories/GetList')

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })
}
