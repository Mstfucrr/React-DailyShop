import { motion } from 'framer-motion'
import { Messages } from 'primereact/messages'
import { useEffect, useRef, useState } from 'react'

import { IOrder } from '@/services/order/types'
import { useGetOrders } from '@/services/order/use-order-service'
import OrderItem from './orderItem'

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[] | null>(null)

  const msgs = useRef<Messages>(null)

  const { data, error, refetch } = useGetOrders()

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
    if (data?.data.data) setOrders(data.data.data)
  }, [data, error])

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
        {orders &&
          orders.length > 0 &&
          orders.map(order => {
            return <OrderItem key={order.id} order={order} />
          })}
      </div>
    </motion.div>
  )
}

export default UserOrders
