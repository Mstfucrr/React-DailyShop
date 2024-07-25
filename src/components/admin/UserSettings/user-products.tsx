import { useAdimnUser } from '@/context/admin/UserContext'
import { IProduct } from '@/shared/types'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { DataView } from 'primereact/dataview'
import { Fieldset } from 'primereact/fieldset'
import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useCallback } from 'react'

type Props = {
  refreshButton: (fetchUserProducts: () => Promise<void>) => JSX.Element
}

const UserProducts = ({ refreshButton }: Props) => {
  const { selectUserProducts, productLoading, handleProductApprovalStatusChange, handleDetleteProduct } = useAdimnUser()

  const handleProductApprovalFalse = (id: number) => {
    handleProductApprovalStatusChange({ id, status: false })
  }
  const handleProductApprovalTrue = (id: number) => {
    handleProductApprovalStatusChange({ id, status: true })
  }

  const renderIsApproved = (data: IProduct) => {
    if (data.isApproved === null)
      return (
        <>
          <Button
            onClick={() => handleProductApprovalTrue(data.id)}
            icon='pi pi-check'
            label='Onayla'
            className='p-button-success p-button-outlined'
            size='small'
          />
          <Button
            onClick={() => handleProductApprovalFalse(data.id)}
            icon='pi pi-times'
            className='p-button-danger p-button-outlined'
            label='Reddet'
            size='small'
          />
        </>
      )
    else if (data.isApproved)
      return (
        <div className='flex flex-row flex-wrap items-center gap-4'>
          <span className='font-semibold text-green-500'>(Onaylandı)</span>
          <Button
            onClick={() => handleProductApprovalFalse(data.id)}
            icon='pi pi-times'
            className='p-button-danger p-button-outlined'
            label='Reddet'
            size='small'
          />
        </div>
      )
    else
      return (
        <div className='flex flex-row flex-wrap items-center gap-4'>
          <Button
            onClick={() => handleProductApprovalTrue(data.id)}
            icon='pi pi-check'
            label='Onayla'
            className='p-button-success p-button-outlined'
            size='small'
          />
          <span className='font-semibold text-red-500'>(Reddedildi)</span>
        </div>
      )
  }
  const confirmDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Silmek istediğinize emin misiniz?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDetleteProduct(id),
      reject: () => {},
      acceptLabel: 'Sil',
      rejectLabel: 'Hayır',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      acceptClassName: 'p-button-danger'
    })
  }
  const renderselectUserProducts = (data: IProduct) => (
    <div className='flex w-full items-center'>
      <div className='ml-2 flex w-full flex-row items-center justify-evenly gap-2'>
        {data.image ? <img src={data.image} alt='' className='h-20 w-20' /> : <span>Resim yok</span>}
        <span className='font-semibold'>{data.name}</span>
        <span className='font-semibold'>{data.price} ₺</span>
        <span className='font-semibold'> {data.stock} adet</span>
        {/* yeni onayla reddet */}
        <Link href={`/product/${data.id}`}>
          <Button label='Ürünü görüntüle' className='p-button-info p-button-outlined' size='small' />
        </Link>
        <div className='card justify-content-center flex flex-wrap gap-2'>{renderIsApproved(data)}</div>
        <ConfirmPopup />

        <Button
          label='Sil'
          onClick={e => confirmDelete(e, data.id)}
          severity='danger'
          loading={false}
          className='ml-3'
        />
      </div>
    </div>
  )

  return (
    <Fieldset
      legend={<h3 className='text-center text-xl font-semibold uppercase text-primary'>Kullanıcı ürünleri</h3>}
      toggleable
    >
      {/* {refreshButton(fetchUserProducts as any)} */}
      {/* // ürünler tablosu */}

      {selectUserProducts && selectUserProducts.length > 0 ? (
        <DataView value={selectUserProducts} itemTemplate={renderselectUserProducts} className='w-full' />
      ) : productLoading ? (
        <ProgressSpinner className='w-full' />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <span className='text-xl font-semibold'>Satışta bekleyen ürünü yok</span>
        </div>
      )}
    </Fieldset>
  )
}

export default UserProducts
