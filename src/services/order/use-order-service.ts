import { useMutation, useQuery } from '@tanstack/react-query'
import orderService from './order.service'
import { IOrderRequest } from './types'
import reactQueryConfig from '@/configs/react-query-config'
import toast from 'react-hot-toast'

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['getOrders'],
    queryFn: orderService.getOrders
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: ({ orderReq }: { orderReq: IOrderRequest }) => orderService.createOrder(orderReq),
    onSuccess: data => {
      toast.success(data.data.message)
      reactQueryConfig.invalidateQueries({ queryKey: ['getOrders'] })
    },
    onError: err => toast.error(err.message)
  })
}

export const useCancelOrder = () => {
  return useMutation({
    mutationKey: ['cancelOrder'],
    mutationFn: ({ id }: { id: number }) => orderService.cancelOrder(id),
    onSuccess: data => {
      toast.success(data.data.message)
      reactQueryConfig.invalidateQueries({ queryKey: ['getOrders'] })
    }
  })
}
