import { IProduct } from '@/shared/types'
import { publicAxiosInstance } from '../base/base'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export type GetProductsResponse = {
  data: IProduct[]
  message: string
}

export type GetProductsRequest = {
  id: number
  isDeletedDatas: boolean
}
export const getProductsByCategoryId = async (input: GetProductsRequest): Promise<AxiosResponse<GetProductsResponse>> =>
  publicAxiosInstance.get<GetProductsResponse>(`Products/category/${input.id}?isDeleteShow=${input.isDeletedDatas}`)

export const useGetProductsByCategoryId = (
  input: GetProductsRequest,
  options?: UseQueryOptions<AxiosResponse<GetProductsResponse>>
) =>
  useQuery({
    queryKey: ['getProductsByCategoryId', input],
    queryFn: () => getProductsByCategoryId(input),
    ...options
  })
