import { orderStatus } from '@/shared/constants'

import { motion } from 'framer-motion'
import { Messages } from 'primereact/messages'
import { useEffect, useRef, useState } from 'react'

import { DataView } from 'primereact/dataview'
import { Fieldset } from 'primereact/fieldset'
import { Steps } from 'primereact/steps'
import { Rating } from 'primereact/rating'
import { cancelOrder, getOrders } from '@/services/order/order.service'
import to from 'await-to-js'
import { IOrder, IOrderAddress, IOrderItem, OrderStatus } from '@/services/order/types'
import { Button } from 'primereact/button'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import Link from 'next/link'

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const { token } = useAuth()
  const steps = orderStatus.map(item => ({ label: item.label }))

  const msgs = useRef<Messages>(null)

  const fetchOrders = async () => {
    const [err, data] = await to(getOrders(token))
    if (err) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: err.message,
          closable: false
        }
      ])
      return
    }
    if (data.data) setOrders(data.data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const legendTemplate = (order: IOrder) => {
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

  const orderAddressTemplate = (address: IOrderAddress) => {
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

  const handleCancelOrder = async (orderId: number) => {
    const [err, data] = await to(cancelOrder(orderId, OrderStatus.Cancelled, token))
    if (err) return toast.error(err.message)
    if (data) {
      toast.success(data.message)
      fetchOrders()
    }
  }

  const confirm = (event: any, orderId: number) => {
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
      accept: () => {
        handleCancelOrder(orderId)
      },
      reject: () => {
        //reject
      }
    })
  }

  const OrderItemTemplate = (orderItem: IOrderItem) => {
    return (
      <div className='m-2 flex w-full px-5 py-8 shadow-lg'>
        <div className='flex flex-row flex-wrap items-center gap-5'>
          <Link
            className='w-full transition duration-300 hover:scale-110 sm:w-1/3'
            href={`/product/${orderItem.product.id}`}
          >
            <img
              src={orderItem.product.image}
              alt={orderItem.product.name}
              className='h-auto w-full object-scale-down'
            />
          </Link>
          <div className=''>
            <div className='product-name'>{orderItem.product.name}</div>
            <Rating
              value={orderItem.product.rating}
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className='w-full px-[15px]'
    >
      <h3 className='my-4 text-4xl text-primaryDark '>Siparişlerim</h3>
      <Messages ref={msgs} />

      {/* order */}

      <div className='flex w-full flex-col gap-7'>
        {orders?.map(order => {
          return (
            <Fieldset
              className='flex w-full flex-col gap-9 shadow-lg'
              toggleable
              key={'order-' + order.id}
              legend={legendTemplate(order)}
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
                  <DataView value={order.orderItems} itemTemplate={OrderItemTemplate} className='flex flex-col gap-4' />
                </div>

                {/* order address */}
                {orderAddressTemplate(order.address)}

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
                onClick={e => confirm(e, order?.id ?? 0)}
                disabled={order.status === OrderStatus.Cancelled}
                label='Siparişi İptal Et'
                icon='pi pi-times'
                iconPos='right'
              />
            </Fieldset>
          )
        })}
      </div>
    </motion.div>
  )
}

export default UserOrders
