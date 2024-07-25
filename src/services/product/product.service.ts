import { privateAxiosInstance, publicAxiosInstance } from '../base/base'
import { GetListProduct, GetProductById, ProductResponse } from './types'

const addProduct = async (input: FormData) =>
  await privateAxiosInstance.post<ProductResponse>('Products', input, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

const getProductById = async (id: number) => await publicAxiosInstance.get<GetProductById>(`Products/${id}`)

const getProductByUser = async () => await privateAxiosInstance.get<GetListProduct>('Products/GetListProductByUser')

const deleteProduct = async (id: number) =>
  await privateAxiosInstance.delete<ProductResponse>(`Products/DeleteProduct/${id}`)

const updateProduct = async (id: number, input: FormData) =>
  await privateAxiosInstance.put<ProductResponse>(`Products/${id}`, input, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export default { addProduct, getProductById, getProductByUser, deleteProduct, updateProduct }
