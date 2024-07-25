import { IOrder, IOrderAddress, IOrderItem, OrderStatus } from '@/services/order/types'
import { useCancelOrder } from '@/services/order/use-order-service'
import { orderStatus } from '@/shared/constants'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { DataView } from 'primereact/dataview'
import { Fieldset } from 'primereact/fieldset'
import { Rating } from 'primereact/rating'
import { Steps } from 'primereact/steps'
import React from 'react'

const OrderItemTemplate = ({ orderItem }: { orderItem: IOrderItem }) => {
  if (!orderItem.product) return null
  const orderItemProduct = orderItem.product
  return (
    <div className='m-2 flex w-full px-5 py-8 shadow-lg'>
      <div className='flex flex-row flex-wrap items-center gap-5'>
        <Link
          className='w-full transition duration-300 hover:scale-110 sm:w-1/3'
          href={`/product/${orderItemProduct.id}`}
        >
          <img src={orderItemProduct.image} alt={orderItemProduct.name} className='h-auto w-full object-scale-down' />
        </Link>
        <div className=''>
          <div className='product-name'>{orderItemProduct.name}</div>
          <Rating
            value={orderItemProduct.rating}
            readOnly
            cancel={false}
            pt={{
              onIcon: { className: '!text-primary' }
            }}
          />
          <div className='product-price'>{orderItem.price} ₺</div>
          <div className='product-quantity'>Quantity: {orderItem.quantity}</div>
          <div className='product-quantity'>Color: {orderItem.color}</div>
          <div className='product-quantity'>Size: {orderItem.size}</div>
        </div>
      </div>
    </div>
  )
}

const LegendTemplate = ({ order }: { order: IOrder }) => {
  return (
    <div className='flex flex-col justify-between !text-sm text-white sm:items-center md:flex-row'>
      <span className='ml-1'>
        Sipariş No: <span className='text-primary'>{order.OrderNumber}</span>
      </span>
      <span className='ml-1'>
        Tarih: <span className='text-primary'>{order.date}</span>
      </span>
      <span className='ml-1'>
        Toplam: <span className='text-primary'>{order.totalPrice} ₺</span>
      </span>
      <span className='ml-1'>
        Durum: <span className='text-primary'>{orderStatus.find(item => item.value === order.status)?.label}</span>
      </span>
    </div>
  )
}

const OrderAddressTemplate = ({ address }: { address: IOrderAddress }) => {
  return (
    <div className='flex w-full flex-col gap-2'>
      <h3 className='text-2xl font-semibold text-primaryDark'>Teslimat Adresi</h3>
      <div className='flex w-full flex-col gap-2'>
        <span className='font-semibold'>{address.title}</span>
        <span className=''>{address.address}</span>
        <span className=''>{address.city}</span>
        <span className=''>{address.zipCode}</span>
      </div>
    </div>
  )
}

const Order = ({ order }: { order: IOrder }) => {
  const { mutate: CancelOrder } = useCancelOrder()
  const steps = orderStatus.map(item => ({ label: item.label }))

  const handleCancelOrder = () => {
    CancelOrder({ id: order.id })
  }
  const confirm = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Siparişi iptal etmek istediğinize emin misiniz?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptClassName: 'p-button-danger',
      rejectClassName: 'p-button-secondary',
      accept: () => handleCancelOrder(),
      reject: () => {
        //reject
      }
    })
  }

  return (
    <Fieldset
      className='flex w-full flex-col gap-9 shadow-lg'
      toggleable
      key={'order-' + order.id}
      legend={<LegendTemplate order={order} />}
      collapseIcon='pi pi-chevron-down text-white'
      collapsed={false}
      expandIcon='pi pi-chevron-up text-white'
      pt={{
        legend: { className: 'w-full !bg-slate-600 ' },
        legendTitle: { className: 'w-full !flex !flex-col' }
      }}
    >
      <div className='flex w-full max-w-xs flex-col gap-6 sm:max-w-none'>
        {/* order items */}
        <div className='flex w-full flex-col'>
          <DataView
            value={order.orderItems}
            itemTemplate={(orderItem: IOrderItem) => <OrderItemTemplate orderItem={orderItem} />}
            className='flex flex-col gap-4'
          />
        </div>

        {/* order address */}
        {order.address && <OrderAddressTemplate address={order.address} />}

        {/* order status */}
        <div className='flex w-full flex-col gap-7 overflow-x-auto'>
          <h3 className='text-2xl font-semibold text-primaryDark'>Sipariş Durumu</h3>
          <Steps
            model={steps}
            readOnly
            activeIndex={orderStatus.findIndex(item => item.value === order.status)}
            className='w-full min-w-[600px]'
          />
        </div>

        {/* order cancel */}
      </div>
      <ConfirmPopup />
      <Button
        severity='danger'
        className='float-right !m-9 w-full sm:w-1/3'
        onClick={e => confirm(e)}
        disabled={order.status === OrderStatus.Cancelled}
        label='Siparişi İptal Et'
        icon='pi pi-times'
        iconPos='right'
      />
    </Fieldset>
  )
}

export default Order
