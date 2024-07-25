import { privateAxiosInstance } from '@/services/base/base'
import { IReview } from '@/shared/types'

interface FetchReviewsByUserIdResponse {
  data: IReview[]
}

interface UpdateReviewStatusResponse {
  message: string
}

export const fetchReviewsByUserId = async (id: number) =>
  await privateAxiosInstance.get<FetchReviewsByUserIdResponse>(`/Reviews/GetListByUserId?UserId=${id}`)

export const updateReviewStatus = async (id: number, status: string) =>
  await privateAxiosInstance.put<UpdateReviewStatusResponse>(`/admin/users/UpdateReviewStatus/${id}?status=${status}`)
