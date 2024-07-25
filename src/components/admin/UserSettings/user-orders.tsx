import { useAdimnUser } from '@/context/admin/UserContext'
import { IOrder, OrderStatus } from '@/services/order/types'
import { orderStatus } from '@/shared/constants'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'
import { Fieldset } from 'primereact/fieldset'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Steps } from 'primereact/steps'
import React, { useCallback } from 'react'

type Props = {
  refreshButton: (fetchUserOrders: () => Promise<void>) => JSX.Element
}

const UserOrders = ({ refreshButton }: Props) => {
  const { selectUserOrders, orderLoading, handleChangeOrderStatus } = useAdimnUser()
  const renderselectUserOrders = useCallback(
    (data: IOrder) => (
      <div className='my-5 flex w-full items-center'>
        <div className='ml-2 flex w-full flex-row items-center justify-evenly gap-2'>
          <span className='flex font-semibold'>Id : {data.id}</span>
          <span className='font-semibold'>Toplam : {data.totalPrice} ₺</span>
          <span className='font-semibold'>Durumu : {orderStatus.find(s => s.value === data.status)?.label}</span>
          <div className='overflow-x-auto'>
            <Steps
              model={orderStatus}
              activeIndex={orderStatus.findIndex(s => s.value === data.status)}
              className='w-[38rem] rounded-md border border-gray-300'
              readOnly={false}
              style={{ backgroundColor: 'transparent' }}
              onSelect={(e: any) => {
                if (data.id) {
                  handleChangeOrderStatus({ orderId: data.id, status: e.item.value as OrderStatus })
                }
              }}
            />
          </div>
          <Link href={`/order/${data.id}`}>
            <Button label='Siparişi görüntüle' className='p-button-info p-button-outlined' size='small' />
          </Link>
        </div>
      </div>
    ),
    [selectUserOrders]
  )
  const orderLoadingTemplate = useCallback(
    () => (
      <>
        {orderLoading ? (
          <ProgressSpinner className='w-full' />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <span className='text-xl font-semibold'>Sipariş bulunamadı</span>
          </div>
        )}
      </>
    ),
    [orderLoading]
  )
  return (
    <Fieldset
      legend={<h3 className='text-center text-xl font-semibold uppercase text-primary'>Kullanıcı siparişleri</h3>}
      toggleable
    >
      {/* {refreshButton(fetchUserOrders as any)} */}
      {/* // ürünler tablosu */}

      {selectUserOrders && selectUserOrders.length > 0 ? (
        <DataView value={selectUserOrders} itemTemplate={renderselectUserOrders} className='w-full' />
      ) : (
        orderLoadingTemplate()
      )}
    </Fieldset>
  )
}

export default UserOrders
