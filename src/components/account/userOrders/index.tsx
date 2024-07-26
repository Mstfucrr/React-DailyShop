import { motion } from 'framer-motion'
import { Messages } from 'primereact/messages'
import { useEffect, useRef } from 'react'

import { useGetOrders } from '@/services/order/use-order-service'
import OrderItem from './orderItem'

const UserOrders = () => {
  const msgs = useRef<Messages>(null)

  const { data: orderData, error, refetch } = useGetOrders()

  useEffect(() => {
    refetch()
    if (error) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: error.message,
          closable: false
        }
      ])
      return
    }
    if (orderData?.length === 0) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'info',
          summary: 'Sipariş Bulunamadı',
          detail: 'Sipariş bulunamadı.',
          closable: false
        }
      ])
    }
  }, [orderData, error, refetch])

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
        {orderData &&
          orderData.length > 0 &&
          orderData.map(order => {
            return <OrderItem key={order.id} order={order} />
          })}
      </div>
    </motion.div>
  )
}

export default UserOrders
