import RefreshButton from '@/components/refreshButton'
import { useAdminUser } from '@/hooks/useAdminUser'
import useAdminReports from '@/services/admin/report/use-admin-reports'
import { IUser } from '@/services/auth/types'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Fieldset } from 'primereact/fieldset'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

type Props = {
  renderRepUserPanel: (user: IUser) => JSX.Element
}

const RenderCardFooterForUser = ({
  user,
  reportId,
  handleDeleteReportForUser
}: {
  user: IUser
  reportId: number
  handleDeleteReportForUser: (reportId: number) => void
}) => {
  const { handleBlockUser } = useAdminUser()
  return (
    <div className='flex flex-row justify-between gap-5'>
      {user.status ? (
        <Button
          onClick={() => handleBlockUser(user.id)}
          icon='pi pi-ban'
          className='p-button-danger p-button-outlined'
          label='Engelle'
          size='small'
        />
      ) : (
        <Button
          onClick={() => handleBlockUser(user.id)}
          icon='pi pi-check'
          className='p-button-success p-button-outlined'
          label='Engeli kaldır'
          size='small'
        />
      )}
      <Button label='Raporu Sil' severity='help' onClick={() => handleDeleteReportForUser(reportId)} />
    </div>
  )
}

const ReportedUsers = ({ renderRepUserPanel }: Props) => {
  const msgsRepUser = useRef<Messages>(null)

  const { useGetReportedUsers, DeleteReportForUser } = useAdminReports()

  const { data: reportedUsers, isLoading: reportedUserLoading, error: reportedUserError, refetch } = useGetReportedUsers

  const handleDeleteReportForUser = async (reportId: number) =>
    DeleteReportForUser(reportId, {
      onSuccess: () => toast.success('Rapor başarıyla silindi.'),
      onError: () => toast.error('Rapor silinirken bir hata oluştu.')
    })

  useEffect(() => {
    if (reportedUserError) {
      msgsRepUser.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: reportedUserError.message,
          closable: false,
          icon: 'pi pi-exclamation-triangle'
        }
      ])
      return
    }
    if (reportedUsers?.length === 0) {
      msgsRepUser.current?.clear()
      msgsRepUser.current?.show([
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
  }, [reportedUserError, reportedUsers])

  return (
    <div className='col-span-1'>
      <Fieldset legend='Raporlanan Kullanıcılar' toggleable={true}>
        {msgsRepUser && <Messages ref={msgsRepUser} className='ml-24 w-1/2' />}
        {reportedUserLoading ? (
          <ProgressSpinner />
        ) : (
          <div className='flex max-h-[30rem] w-full flex-wrap gap-4 overflow-y-auto'>
            <div className='sticky top-0 z-20 flex w-full justify-end bg-transparent pr-10'>
              <RefreshButton refreshFunction={refetch} />
            </div>
            {reportedUsers?.map(repUser => (
              <div key={'reportedUser-' + repUser.id} className='min-w-full'>
                <Card
                  key={repUser.id}
                  footer={
                    <RenderCardFooterForUser
                      user={repUser.user}
                      reportId={repUser.id}
                      handleDeleteReportForUser={handleDeleteReportForUser}
                    />
                  }
                  pt={{
                    body: { className: 'bg-[#fff6f6] w-full' }
                  }}
                  className='flex w-full'
                >
                  <div className='flex w-full flex-row flex-wrap'>
                    {/* rapor eden kullanıcı */}
                    <div className='max-w-[400px]'>
                      <strong>Rapor Eden Kullanıcı:</strong>
                      <br />
                      <div className='flex flex-row flex-wrap gap-3'>{renderRepUserPanel(repUser.reporterUser)}</div>
                    </div>

                    {/* raporlanan kullanıcı */}
                    <div className='max-w-[400px]'>
                      <strong>Raporlanan Kullanıcı:</strong>
                      <br />
                      <div className='flex flex-row flex-wrap gap-3'>{renderRepUserPanel(repUser.user)}</div>
                    </div>

                    {/* rapor tarihi */}
                    <div>
                      <strong>Rapor Tarihi:</strong>
                      <br /> {repUser.createdAt?.toString().split('T')[0]}
                    </div>

                    {/* rapor mesajı */}
                    <div className='mt-2 w-full'>
                      <strong>Rapor Mesajı:</strong>
                      <br /> {repUser.reportedMessage}
                    </div>
                  </div>

                  {/* Daha fazla bilgi ekleyebilirsiniz */}
                </Card>
              </div>
            ))}
          </div>
        )}
      </Fieldset>
    </div>
  )
}

export default ReportedUsers
