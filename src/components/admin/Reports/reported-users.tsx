import { useAuth } from '@/hooks/useAuth'
import { userService } from '@/services/admin/admin.service'
import reportsService, { IReportedUsers } from '@/services/admin/reports.service'
import { IUser } from '@/services/auth/types'
import to from 'await-to-js'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Fieldset } from 'primereact/fieldset'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  renderRepUserPanel: (user: IUser) => JSX.Element
  refreshButton: (fetchData: () => Promise<void>) => JSX.Element
}

const ReportedUsers = ({ renderRepUserPanel, refreshButton }: Props) => {
  const { token } = useAuth()
  const [reportedUserLoading, setReportedUserLoading] = useState<boolean>(false)
  const [reportedUsers, setReportedUsers] = useState<IReportedUsers[]>([])
  const msgsRepUser = useRef<Messages>(null)

  const showErrorMessage = (err: Error) => toast.error(err.message)

  const showSuccess = (message: string) => toast.success(message)

  const fetchReportedUsers = async () => {
    setReportedUserLoading(true)
    msgsRepUser.current?.clear() // Clear previous messages

    const [err, data] = await to(reportsService.getReportedUsers(token))

    if (err) {
      msgsRepUser.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: err.message,
          closable: false,
          icon: 'pi pi-exclamation-triangle'
        }
      ])
      setReportedUserLoading(false)
      return
    }
    if (data.data.length === 0) {
      msgsRepUser.current?.clear() // Clear previous messages
      msgsRepUser.current?.show([
        {
          sticky: true,
          severity: 'info',
          summary: 'Raporlanan Kullanıcı Bulunamadı',
          detail: 'Raporlanan kullanıcı bulunamadı.',
          closable: false,
          icon: 'pi pi-info-circle'
        }
      ])
      setReportedUsers([])
    } else {
      setReportedUsers(data.data)
    }
    setReportedUserLoading(false)
  }

  const handleDeleteReportForUser = async (reportId: number) => {
    const [err, data] = await to(reportsService.deleteReportForUser(reportId, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
    fetchReportedUsers()
  }

  useEffect(() => {
    fetchReportedUsers()
  }, [])

  const renderCardFooterForUser = (user: IUser, reportId: number) => {
    return (
      <div className='flex flex-row justify-between gap-5'>
        {user.status ? (
          <Button
            onClick={() => {
              handleBlockUser(user.id)
            }}
            icon='pi pi-ban'
            className='p-button-danger p-button-outlined'
            label='Engelle'
            size='small'
          />
        ) : (
          <Button
            onClick={() => {
              handleBlockUser(user.id)
            }}
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

  const handleBlockUser = async (id: number) => {
    const [err, data] = await to(userService.blockUser(id, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
  }

  const renderReportedUsersCard = (reportedItem: IReportedUsers) => (
    <Card
      key={reportedItem.id}
      footer={renderCardFooterForUser(reportedItem.user, reportedItem.id)}
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
          <div className='flex flex-row flex-wrap gap-3'>{renderRepUserPanel(reportedItem.reporterUser)}</div>
        </div>

        {/* raporlanan kullanıcı */}
        <div className='max-w-[400px]'>
          <strong>Raporlanan Kullanıcı:</strong>
          <br />
          <div className='flex flex-row flex-wrap gap-3'>{renderRepUserPanel(reportedItem.user)}</div>
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
      </div>

      {/* Daha fazla bilgi ekleyebilirsiniz */}
    </Card>
  )
  return (
    <div className='col-span-1'>
      <Fieldset legend='Raporlanan Kullanıcılar' toggleable={true}>
        {msgsRepUser && <Messages ref={msgsRepUser} className='ml-24 w-1/2' />}
        {reportedUserLoading ? (
          <ProgressSpinner />
        ) : (
          <div className='flex max-h-[30rem] w-full flex-wrap gap-4 overflow-y-auto'>
            <div className='sticky top-0 z-20 flex w-full justify-end bg-transparent pr-10'>
              {refreshButton(fetchReportedUsers)}
            </div>
            {reportedUsers.map(repUser => (
              <div key={'reportedUser-' + repUser.id} className='min-w-full'>
                {renderReportedUsersCard(repUser)}
              </div>
            ))}
          </div>
        )}
      </Fieldset>
    </div>
  )
}

export default ReportedUsers
