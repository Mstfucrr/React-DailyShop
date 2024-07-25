import { privateAxiosInstance } from '@/services/base/base'
import { IProduct } from '@/shared/types'

interface IProductResponse {
  data: IProduct[]
}

interface IProductUpdateResponse {
  message: string
}

const fetchPaddingProductByUserId = async (id: number) =>
  await privateAxiosInstance.get<IProductResponse>(`/admin/Users/${id}/Products`)

const updateProductApprovalStatus = async (id: number, IsApproved: boolean) =>
  await privateAxiosInstance.put<IProductUpdateResponse>(`/Admin/Products/UpdateStatus/${id}?IsApproved=${IsApproved}`)

export const productService = {
  fetchPaddingProductByUserId,
  updateProductApprovalStatus
}
