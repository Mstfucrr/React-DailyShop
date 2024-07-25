import { useMutation, useQuery } from '@tanstack/react-query'
import productService from './product.service'
import reactQueryConfig from '@/configs/react-query-config'

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ['addProduct'],
    mutationFn: productService.addProduct
  })
}

export const useGetProductById = (id: number) =>
  useQuery({
    queryKey: ['getProductById', id],
    queryFn: () => productService.getProductById(id).then(res => res.data.data)
  })

export const useGetProductByUser = () =>
  useQuery({
    queryKey: ['getProductByUser'],
    queryFn: productService.getProductByUser
  })

export const useDeleteProduct = () =>
  useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: productService.deleteProduct
  })

export const useUpdateProduct = () =>
  useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: ({ id, input }: { id: number; input: FormData }) => productService.updateProduct(id, input),
    onSuccess: () => reactQueryConfig.invalidateQueries({ queryKey: ['getProductByUser'] })
  })
