import { useAdminUser } from '@/hooks/useAdminUser'
import { reviewStatus } from '@/shared/constants'
import { IReview } from '@/shared/types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Fieldset } from 'primereact/fieldset'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Rating } from 'primereact/rating'
import React from 'react'

const UserReviews = () => {
  const { selectedUserReviews, reviewLoading, handleReviewStatusChange } = useAdminUser()

  const renderProductImage = (data: IReview) => (
    <Link href={`/product/${data?.product?.id}`} className='flex w-max items-center'>
      {data.product?.image ? (
        <Image src={data.product?.image} alt='' className='size-20' width={80} height={80} />
      ) : (
        <span>Resim Yok</span>
      )}
    </Link>
  )

  const renderStatusDropdown = (data: IReview) => (
    <Dropdown
      options={reviewStatus}
      value={data.status ?? 'New'}
      onChange={e => {
        handleReviewStatusChange({ id: data.id, status: e.value })
      }}
    />
  )

  const refreshButton = (refreshFunction: () => Promise<void>) => (
    <div className='my-3 flex justify-end'>
      <Button
        label='Yenile'
        icon='pi pi-refresh'
        className='p-button-raised p-button-rounded p-button-text'
        onClick={refreshFunction}
      />
    </div>
  )

  return (
    <div className='mt-5'>
      <div className='flex flex-col'>
        <Fieldset
          legend={<h3 className='text-center text-xl font-semibold uppercase text-primary'>Kullanıcı Yorumları</h3>}
          toggleable
        >
          {/* Yenile */}
          {refreshButton(() => null as any)}

          {/* Yorumlar tablosu */}
          {reviewLoading ? (
            <ProgressSpinner className='w-full' />
          ) : (
            <>
              {selectedUserReviews && selectedUserReviews.length > 0 ? (
                <DataTable
                  value={selectedUserReviews}
                  scrollable
                  scrollHeight='400px'
                  emptyMessage='Yorum bulunamadı'
                  filterIcon='pi pi-search'
                >
                  <Column field='id' header='ID' />
                  <Column field='comment' header='Yorum' maxConstraints={20} />
                  <Column header='Ürün Bağlantılı Resmi' body={renderProductImage} />
                  <Column
                    field='rating'
                    header='Puan'
                    body={data => <Rating value={data.rating} readOnly cancel={false} />}
                  />
                  <Column header='Durum' body={renderStatusDropdown} />
                </DataTable>
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <span className='text-xl font-semibold'>Yorum bulunamadı</span>
                </div>
              )}
            </>
          )}
        </Fieldset>
      </div>
    </div>
  )
}

export default UserReviews
