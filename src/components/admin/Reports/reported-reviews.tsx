import RefreshButton from '@/components/refreshButton'
import { useAdminUser } from '@/hooks/useAdminUser'
import { IReportedReviews } from '@/services/admin/report/reports.service'
import useAdminReports from '@/services/admin/report/use-admin-reports'
import { IUser } from '@/services/auth/types'
import { reviewStatus } from '@/shared/constants'
import { IReview } from '@/shared/types'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { Fieldset } from 'primereact/fieldset'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

type Props = {
  renderRepUserPanel: (user: IUser) => JSX.Element
}

const ReportedReviews = ({ renderRepUserPanel }: Props) => {
  const msgsRepReview = useRef<Messages>(null)
  const { handleReviewStatusChange } = useAdminUser()

  const { useGetReportedReviews, DeleteReportForReview } = useAdminReports()

  const {
    data: reportedReviews,
    isLoading: reportedReviewLoading,
    error: reportedReviewError,
    refetch
  } = useGetReportedReviews

  const handleDeleteReportForReview = async (reportId: number) => {
    DeleteReportForReview(reportId, {
      onSuccess: () => {
        toast.success('Rapor başarıyla silindi.')
        refetch()
      },
      onError: () => toast.error('Rapor silinirken bir hata oluştu.')
    })
  }

  const renderCardFooterForReview = (review: IReview, reportId: number) => {
    return (
      <div className='flex flex-row justify-between gap-5'>
        <Dropdown
          options={reviewStatus}
          value={review.status ?? 'New'}
          onChange={e => {
            handleReviewStatusChange({ id: review.id, status: e.value })
          }}
        />
        <Button label='Raporu Sil' severity='help' onClick={() => handleDeleteReportForReview(reportId)} />
      </div>
    )
  }
  const renderReportedReviewsCard = (reportedItem: IReportedReviews) => (
    <Card
      key={reportedItem.review.id}
      footer={renderCardFooterForReview(reportedItem.review, reportedItem.id)}
      pt={{
        body: { className: 'bg-[#f4f4ff] w-full' }
      }}
      className='flex w-full'
    >
      <div className='flex w-full flex-row flex-wrap'>
        {/* rapor eden kullanıcı */}
        <div className='max-w-[400px]'>
          <strong>Rapor Eden Kullanıcı:</strong>
          <br />
          <div className='flex flex-row flex-wrap gap-3'>{renderRepUserPanel(reportedItem.reporterUser)}</div>
        </div>

        {/* raporlanan kullanıcı */}
        <div className='max-w-[400px]'>
          <strong>Raporlanan Kullanıcı:</strong>
          <br />
          <div className='flex flex-row flex-wrap gap-3'>{renderRepUserPanel(reportedItem.review.user as IUser)}</div>
        </div>

        {/* rapor tarihi */}
        <div>
          <strong>Rapor Tarihi:</strong>
          <br /> {reportedItem.createdAt?.toString().split('T')[0]}
        </div>

        {/* rapor mesajı */}
        <div className='mt-2 w-full'>
          <strong>Rapor Mesajı:</strong>
          <br /> {reportedItem.reportedMessage}
        </div>

        {/* yorum */}
        <div className='mt-2 w-full'>
          <strong>Yorum:</strong>
          <br /> {reportedItem.review.comment}
        </div>
      </div>

      {/* Daha fazla bilgi ekleyebilirsiniz */}
    </Card>
  )

  useEffect(() => {
    if (reportedReviewError) {
      msgsRepReview.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: reportedReviewError.message,
          closable: false,
          icon: 'pi pi-exclamation-triangle'
        }
      ])
      return
    }
    if (reportedReviews?.length === 0) {
      msgsRepReview.current?.clear()
      msgsRepReview.current?.show([
        {
          sticky: true,
          severity: 'info',
          summary: 'Raporlanan Yorum Bulunamadı',
          detail: 'Raporlanan yorum bulunamadı.',
          closable: false,
          icon: 'pi pi-info-circle'
        }
      ])
    }
  }, [reportedReviewError, reportedReviews])

  return (
    <div className='col-span-1'>
      <Fieldset legend='Raporlanan Yorumlar' toggleable={true}>
        {msgsRepReview && <Messages ref={msgsRepReview} className='ml-24 w-1/2' />}
        {reportedReviewLoading ? (
          <ProgressSpinner />
        ) : (
          <div className='flex max-h-[30rem] w-full flex-wrap gap-4 overflow-y-auto'>
            <div className='sticky top-0 z-20 flex w-full justify-end bg-transparent pr-10'>
              <RefreshButton refreshFunction={refetch} />
            </div>
            {reportedReviews?.map(repReview => (
              <div key={'reportedReview-' + repReview.review.id}>{renderReportedReviewsCard(repReview)}</div>
            ))}
          </div>
        )}
      </Fieldset>
    </div>
  )
}

export default ReportedReviews
