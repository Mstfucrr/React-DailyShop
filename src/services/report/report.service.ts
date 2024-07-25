import { privateAxiosInstance } from '../base/base'

interface IReportResponse {
  message: string
}

type ReportReviewInput = {
  message: string
}

type ReportUserInput = {
  message: string
}

const reportReview = async (reviewId: number, input: ReportReviewInput) =>
  await privateAxiosInstance.post<IReportResponse>(`Reviews/ReportReview/${reviewId}`, input)

const reportUser = async (userId: number, input: ReportUserInput) =>
  await privateAxiosInstance.post<IReportResponse>(`Users/ReportUser/${userId}`, input)

export default { reportReview, reportUser }
