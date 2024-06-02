import { useAuth } from '@/hooks/useAuth'
import { userService } from '@/services/admin/admin.service'
import reportsService, { IReportedReviews } from '@/services/admin/reports.service'
import { IUser } from '@/services/auth/types'
import { reviewStatus } from '@/shared/constants'
import { IReview } from '@/shared/types'
import to from 'await-to-js'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { Fieldset } from 'primereact/fieldset'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  renderRepUserPanel: (user: IUser) => JSX.Element
  refreshButton: (fetchData: () => Promise<void>) => JSX.Element
}

const ReportedReviews = ({ refreshButton, renderRepUserPanel }: Props) => {
  const { token } = useAuth()
  const [reportedReviews, setReportedReviews] = useState<IReportedReviews[]>([])
  const msgsRepReview = useRef<Messages>(null)
  const [reportedReviewLoading, setReportedReviewLoading] = useState<boolean>(false)

  const fetchReportedReviews = async () => {
    setReportedReviewLoading(true)
    msgsRepReview.current?.clear() // Clear previous messages

    const [err, data] = await to(reportsService.getReportedReviews(token))

    if (err) {
      msgsRepReview.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: err.message,
          closable: false,
          icon: 'pi pi-exclamation-triangle'
        }
      ])
      setReportedReviewLoading(false)

      return
    }
    if (data.data.length === 0) {
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
      setReportedReviews([])
    } else {
      setReportedReviews(data.data)
    }
    setReportedReviewLoading(false)
  }

  useEffect(() => {
    fetchReportedReviews()
  }, [])
  const showErrorMessage = (err: Error) => toast.error(err.message)

  const showSuccess = (message: string) => toast.success(message)

  const handleDeleteReportForReview = async (reportId: number) => {
    const [err, data] = await to(reportsService.deleteReportForReview(reportId, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
    fetchReportedReviews()
  }
  const handleReviewStatusChange = async (data: IReview, status: string) => {
    const [err, data2] = await to(userService.updateReviewStatus(data.id, status, token))
    if (err) return showErrorMessage(err)
    showSuccess(data2.message)
  }

  const renderStatusDropdown = (data: IReview) => (
    <Dropdown
      options={reviewStatus}
      value={data.status ?? 'New'}
      onChange={e => {
        handleReviewStatusChange(data, e.value)
      }}
    />
  )
  const renderCardFooterForReview = (review: IReview, reportId: number) => {
    return (
      // engelle , raporu sil

      <div className='flex flex-row justify-between gap-5'>
        {renderStatusDropdown(review)}
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

  return (
    <div className='col-span-1'>
      <Fieldset legend='Raporlanan Yorumlar' toggleable={true}>
        {msgsRepReview && <Messages ref={msgsRepReview} className='ml-24 w-1/2' />}
        {reportedReviewLoading ? (
          <ProgressSpinner />
        ) : (
          <div className='flex max-h-[30rem] w-full flex-wrap gap-4 overflow-y-auto'>
            <div className='sticky top-0 z-20 flex w-full justify-end bg-transparent pr-10'>
              {refreshButton(fetchReportedReviews)}
            </div>
            {reportedReviews.map(repReview => (
              <div key={'reportedReview-' + repReview.review.id}>{renderReportedReviewsCard(repReview)}</div>
            ))}
          </div>
        )}
      </Fieldset>
    </div>
  )
}

export default ReportedReviews
