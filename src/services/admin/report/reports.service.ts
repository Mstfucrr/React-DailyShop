import { IReview } from '@/shared/types'
import { IUser } from '../../auth/types'
import { makeRequest, privateAxiosInstance } from '../../base/base'

// Reportlanan kullanıcılar ve yorumlar için servisler

export interface IReportBase {
  id: number
  reporterUser: IUser
  createdAt: string
  reportedMessage: string
}

export interface IReportedUsers extends IReportBase {
  user: IUser
}

export interface IReportedReviews extends IReportBase {
  review: IReview
}

// USERS
interface IGetReportedUsersResponse {
  data: IReportedUsers[]
}

interface IDeleteReportForUserResponse {
  message: string
}

const getReportedUsers = async () =>
  await privateAxiosInstance.get<IGetReportedUsersResponse>('Admin/Users/ReportedUsers')

const deleteReportForUser = async (reportId: number) =>
  await privateAxiosInstance.delete<IDeleteReportForUserResponse>(`Admin/Users/ReportedUsers/${reportId}`)

// REVIEWS

interface IGetReportedReviewsResponse {
  data: IReportedReviews[]
}

interface IDeleteReportForReviewResponse {
  message: string
}
const getReportedReviews = async () =>
  await privateAxiosInstance.get<IGetReportedReviewsResponse>('Admin/Reviews/ReportedReviews')

const deleteReportForReview = async (reportId: number) =>
  await privateAxiosInstance.delete<IDeleteReportForReviewResponse>(`Admin/Reviews/ReportedReviews/${reportId}`)

export default {
  // USERS
  getReportedUsers,
  deleteReportForUser,
  // REVIEWS
  getReportedReviews,
  deleteReportForReview
}
