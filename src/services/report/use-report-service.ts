import { useMutation } from '@tanstack/react-query'
import reportService from './report.service'

type ReportReviewInput = {
  message: string
}

type ReportUserInput = {
  message: string
}

const useReportService = () => {
  const { mutate: ReportReview } = useMutation({
    mutationKey: ['reportReview'],
    mutationFn: ({ reviewId, input }: { reviewId: number; input: ReportReviewInput }) =>
      reportService.reportReview(reviewId, input)
  })
  const { mutate: ReportUser } = useMutation({
    mutationKey: ['reportUser'],
    mutationFn: ({ userId, input }: { userId: number; input: ReportUserInput }) =>
      reportService.reportUser(userId, input)
  })
  return {
    ReportReview,
    ReportUser
  }
}

export default useReportService
