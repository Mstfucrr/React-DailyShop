import { useMutation, useQuery } from '@tanstack/react-query'
import { IaddToCartRequest } from './types'
import orderService from './order.service'
import reactQueryConfig from '@/configs/react-query-config'
import toast from 'react-hot-toast'

export const useGetCart = () =>
  useQuery({
    queryKey: ['getCart'],
    queryFn: orderService.getCart
  })

export const useAddToCart = () =>
  useMutation({
    mutationKey: ['addToCart'],
    mutationFn: ({ productId, input }: { productId: number; input: IaddToCartRequest }) =>
      orderService.addToCart(productId, input),
    onSuccess: () => reactQueryConfig.invalidateQueries({ queryKey: ['getCart'] })
  })

export const useUpdateCart = () =>
  useMutation({
    mutationKey: ['updateCart'],
    mutationFn: ({ id, input }: { id: number; input: any }) => orderService.updateCart(id, input),
    onSuccess: data => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getCart'] })
      toast.success(data.data.message)
    },
    onError: err => toast.error(err.message)
  })

export const useRemoveFromCart = () =>
  useMutation({
    mutationKey: ['removeFromCart'],
    mutationFn: ({ id }: { id: number }) => orderService.removeFromCart(id),
    onSuccess: data => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getCart'] })
      toast.success(data.data.message)
    },
    onError: err => toast.error(err.message)
  })
