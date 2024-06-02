import { useCallback } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { IUser } from '@/services/auth/types'
import { Button } from 'primereact/button'
import { useAdimnUser } from '@/context/admin/UserContext'
import UserAddress from './user-adress'
import UserReviews from './user-review'
import UserProducts from './user-products'
import UserOrders from './user-orders'

const UserSettings = () => {
  const { users, selectedUser, selectedUserReviews, selectUserProducts, loading, setSelectedUser, handleBlockUser } =
    useAdimnUser()

  const renderUserBlockButton = useCallback(
    (data: IUser) => (
      <>
        {data.status ? (
          <Button
            onClick={() => {
              handleBlockUser(data.id)
            }}
            icon='pi pi-ban'
            className='p-button-danger p-button-outlined'
            label='Engelle'
            size='small'
          />
        ) : (
          <Button
            onClick={() => {
              handleBlockUser(data.id)
            }}
            icon='pi pi-check'
            className='p-button-success p-button-outlined'
            label='Engeli kaldır'
            size='small'
          />
        )}
      </>
    ),
    [handleBlockUser]
  )

  const refreshButton = useCallback(
    (refreshFunction: () => Promise<void>) => (
      <div className='my-3 flex justify-end'>
        <Button
          label='Yenile'
          icon='pi pi-refresh'
          className='p-button-raised p-button-rounded p-button-text'
          onClick={refreshFunction}
        />
      </div>
    ),
    [users, selectedUserReviews, selectUserProducts]
  )

  return (
    <div className='flex w-full flex-col gap-10'>
      {/* Kullanıcı listesi */}
      {users && <h1 className='text-2xl font-semibold uppercase text-primary'>Kullanıcılar</h1>}
      {users && users.length > 0 && (
        <DataTable
          value={users}
          loading={loading}
          selection={selectedUser}
          onSelectionChange={e => setSelectedUser(e.value as IUser)}
          scrollable
          scrollHeight='400px'
        >
          <Column selectionMode='single' headerStyle={{ width: '3rem' }}></Column>
          <Column field='id' header='ID' />
          <Column field='name' header='İsim' />
          <Column field='surname' header='Soyisim' />
          <Column field='email' header='E-posta' />
          <Column field='role' header='Rol' />
          <Column header='Engelle' body={renderUserBlockButton}></Column>
        </DataTable>
      )}
      {/* Seçilen kişinin detaylı bilgileri ( yaptığı yorumları denetimden geçirme, status(yeni, onayla, reddet)) , satış yapacağı ürünü denetleyip onaylama */}

      {selectedUser && (
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-semibold uppercase text-primary'>Kullanıcı Bilgileri</h1>
          <div className='flex w-full flex-wrap justify-evenly gap-6'>
            <div className='flex flex-wrap gap-2'>
              <span>İsim Soyisim</span>
              <span className='font-semibold'>
                {selectedUser.name} {selectedUser.surname}
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              <span>E-posta</span>
              <span className='font-semibold'>{selectedUser.email}</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              <span>Telefon</span>
              <span className='font-semibold'>{selectedUser.phone}</span>
            </div>
          </div>
          {/* Adres bilgileri */}
          <UserAddress />
          {/* Yorumlar */}
          <UserReviews />
          {/* Ürünler */}
          <UserProducts refreshButton={refreshButton} />
          {/* Siparişler */}
          <UserOrders refreshButton={refreshButton} />
        </div>
      )}
    </div>
  )
}

export default UserSettings
