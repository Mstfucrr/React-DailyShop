import { useMutation, useQuery } from '@tanstack/react-query'
import reportsService from './reports.service'
import reactQueryConfig from '@/configs/react-query-config'

const useAdminReports = () => {
  const useGetReportedUsers = useQuery({
    queryKey: ['getReportedUsers'],
    queryFn: () => reportsService.getReportedUsers().then(res => res.data.data)
  })

  const useGetReportedReviews = useQuery({
    queryKey: ['getReportedReviews'],
    queryFn: () => reportsService.getReportedReviews().then(res => res.data.data)
  })

  const { mutate: DeleteReportForUser } = useMutation({
    mutationKey: ['deleteReportForUser'],
    mutationFn: (reportId: number) => reportsService.deleteReportForUser(reportId),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getReportedUsers'] })
    }
  })

  const { mutate: DeleteReportForReview } = useMutation({
    mutationKey: ['deleteReportForReview'],
    mutationFn: (reportId: number) => reportsService.deleteReportForReview(reportId),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getReportedReviews'] })
    }
  })

  return { useGetReportedUsers, useGetReportedReviews, DeleteReportForUser, DeleteReportForReview }
}

export default useAdminReports
