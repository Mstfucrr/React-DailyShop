import { IProduct } from '@/shared/types'
import { publicAxiosInstance } from '../base/base'
import { useQuery } from '@tanstack/react-query'

export type GetProductsResponse = {
  data: IProduct[]
  message: string
}

export type GetProductsRequest = {
  id: number
  isDeletedDatas: boolean
}
export const getProductsByCategoryId = async (input: GetProductsRequest) =>
  publicAxiosInstance.get<GetProductsResponse>(`Products/category/${input.id}?isDeleteShow=${input.isDeletedDatas}`)

export const useGetProductsByCategoryId = (input: GetProductsRequest) =>
  useQuery({
    queryKey: ['getProductsByCategoryId', input],
    queryFn: async () => (await getProductsByCategoryId(input)).data.data
  })
