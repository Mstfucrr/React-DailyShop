import { useDeleteProduct } from '@/services/product/use-product-service'
import { privateAxiosInstance } from '../../base/base'
import { useQuery } from '@tanstack/react-query'
import { IProduct } from '@/shared/types'

export type IProductResponse = {
  data: IProduct[]
}

const fetchProducts = async () => await privateAxiosInstance.get<IProductResponse>(`Products`)

const useGetAllProducts = () =>
  useQuery({
    queryKey: ['getAllProducts'],
    queryFn: fetchProducts
  })

// deleteProduct
export { useDeleteProduct, useGetAllProducts }
