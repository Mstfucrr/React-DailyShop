// import { makeRequest } from '../base/base'

import { IReview } from '@/shared/types'
import { privateAxiosInstance, publicAxiosInstance } from '../base/base'

interface IGetReviewByProductIdResponse {
  data: IReview[]
}

interface IAddReviewToProductResponse {
  message: string
}

interface IAddAnswerToReviewResponse {
  message: string
}

interface IDeleteReviewFromProductResponse {
  message: string
}

const getReviewsByProductId = async (productId: number) =>
  await publicAxiosInstance.get<IGetReviewByProductIdResponse>(`Reviews/GetReviewByProductId/${productId}`)

const addReviewToProduct = async (productId: number, input: any) =>
  await privateAxiosInstance.post<IAddReviewToProductResponse>(`Reviews/AddReviewToProduct/${productId}`, input)

const addAnswerToReview = async (productId: number, input: any) =>
  await privateAxiosInstance.post<IAddAnswerToReviewResponse>(`Reviews/AddReviewToReview/${productId}`, input)

const deleteReviewFromProduct = async (reviewId: number) =>
  await privateAxiosInstance.delete<IDeleteReviewFromProductResponse>(`Reviews/${reviewId}`)

export default {
  getReviewsByProductId,
  addReviewToProduct,
  addAnswerToReview,
  deleteReviewFromProduct
}
