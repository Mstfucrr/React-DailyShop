import { useAdimnUser } from '@/context/admin/UserContext'
import { reviewStatus } from '@/shared/constants'
import { IReview } from '@/shared/types'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Fieldset } from 'primereact/fieldset'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Rating } from 'primereact/rating'
import React, { useCallback } from 'react'

type Props = {}

const UserReviews = (props: Props) => {
  const { selectedUserReviews, reviewLoading, fetchUserReviews, handleReviewStatusChange } = useAdimnUser()

  const renderProductImage = useCallback(
    (data: IReview) => (
      <Link href={`/product/${data?.product?.id}`} className='flex items-center justify-center'>
        {data.product?.image ? <img src={data.product?.image} alt='' className='h-20 w-20' /> : <span>Resim Yok</span>}
      </Link>
    ),
    []
  )

  const renderRating = useCallback((data: IReview) => <Rating value={data.rating} readOnly cancel={false} />, [])

  const renderStatusDropdown = useCallback(
    (data: IReview) => (
      <Dropdown
        options={reviewStatus}
        value={data.status ?? 'New'}
        onChange={e => {
          handleReviewStatusChange(data, e.value).then(fetchUserReviews)
        }}
      />
    ),
    [fetchUserReviews, handleReviewStatusChange]
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
    [selectedUserReviews]
  )

  return (
    <div className='mt-5'>
      <div className='flex flex-col'>
        <Fieldset
          legend={<h3 className='text-center text-xl font-semibold uppercase text-primary'>Kullanıcı Yorumları</h3>}
          toggleable
        >
          {/* Yenile */}
          {refreshButton(fetchUserReviews as any)}

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
                  <Column header='Ürün Bağlantılı Resmi' body={renderProductImage}></Column>
                  <Column field='rating' header='Puan' body={renderRating}></Column>
                  <Column header='Durum' body={renderStatusDropdown}></Column>
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
