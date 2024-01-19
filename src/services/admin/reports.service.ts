import { IReview } from '@/shared/types'
import { IUser } from '../auth/types'
import { makeRequest } from '../base/base'

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
// Reportlanan kullanıcıları getir
const getReportedUsers = async (token: string) =>
  await makeRequest<any>('Admin/Users/ReportedUsers', 'GET', null, token)

// Kullacıya ait raporu sil
const deleteReportForUser = async (reportId: number, token: string) =>
  await makeRequest<any>(`Admin/Users/ReportedUsers/${reportId}`, 'DELETE', null, token)

// REVIEWS
// Reportlanan yorumları getir
const getReportedReviews = async (token: string) =>
  await makeRequest<any>('Admin/Reviews/ReportedReviews', 'GET', null, token)

// Yoruma ait raporu sil
const deleteReportForReview = async (reportId: number, token: string) =>
  await makeRequest<any>(`Admin/Reviews/ReportedReviews/${reportId}`, 'DELETE', null, token)

export default {
  // USERS
  getReportedUsers,
  deleteReportForUser,
  // REVIEWS
  getReportedReviews,
  deleteReportForReview
}
