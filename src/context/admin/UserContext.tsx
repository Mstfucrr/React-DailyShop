'use client'
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { IUser, IUserAddress } from '@/services/auth/types'
import { IProduct, IReview } from '@/shared/types'
import { IOrder, OrderStatus } from '@/services/order/types'
import { userService } from '@/services/admin/admin.service'
import { useDeleteProduct } from '@/services/product/use-product-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchReviewsByUserId, updateReviewStatus } from '@/services/admin/user/review.service'
import { productService } from '@/services/admin/user/produt.service'
import { fetchOrdersByUserId, updateOrderStatus } from '@/services/admin/user/order.service'
import reactQueryConfig from '@/configs/react-query-config'

export type UserContextType = {
  users: IUser[] | undefined
  selectedUser: IUser | undefined
  selectedUserAddress: IUserAddress[]
  selectedUserReviews: IReview[]
  selectUserProducts: IProduct[]
  selectUserOrders: IOrder[]
  loading: boolean
  productLoading: boolean
  reviewLoading: boolean
  orderLoading: boolean
  setSelectedUser: (user: IUser) => void
  handleReviewStatusChange: ({ id, status }: { id: number; status: string }) => void
  handleProductApprovalStatusChange: ({ id, status }: { id: number; status: boolean }) => void
  handleBlockUser: (id: number) => void
  handleDetleteProduct: (id: number) => void
  handleChangeOrderStatus: ({ orderId, status }: { orderId: number; status: OrderStatus }) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const params = useSearchParams()
  const router = useRouter()
  const showErrorMessage = (err: Error) => toast.error(err.message)

  const showSuccess = (message: string) => toast.success(message)

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading
  } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: () => userService.fetchUsers().then(res => res.data.data)
  })

  useEffect(() => {
    if (usersError) {
      showErrorMessage(usersError)
      return
    }
    const userId = params.get('userId')
    if (userId && users && users.length > 0 && !selectedUser) {
      const user = users.find(u => u.id === Number(userId))
      setSelectedUser(user)
    }
  }, [users, params, selectedUser, usersError])

  const { data: selectedUserAddress } = useQuery({
    queryKey: ['fetchUserAddress', selectedUser?.id],
    queryFn: () => userService.fetchAddressByUserId(selectedUser?.id ?? 0).then(res => res.data.data),
    enabled: !!selectedUser
  })

  const { data: selectedUserReviews } = useQuery({
    queryKey: ['fetchUserReviews', selectedUser?.id],
    queryFn: () => fetchReviewsByUserId(selectedUser?.id ?? 0).then(res => res.data.data),
    enabled: !!selectedUser
  })

  const { data: selectUserProducts } = useQuery({
    queryKey: ['fetchUserProducts', selectedUser?.id],
    queryFn: () => productService.fetchPaddingProductByUserId(selectedUser?.id ?? 0).then(res => res.data.data),
    enabled: !!selectedUser
  })

  const { data: selectUserOrders, isLoading: orderLoading } = useQuery({
    queryKey: ['fetchUserOrders', selectedUser?.id],
    queryFn: () => fetchOrdersByUserId(selectedUser?.id ?? 0).then(res => res.data.data),
    enabled: !!selectedUser
  })

  useEffect(() => {
    if (selectedUser) router.push(`/admin/users?userId=${selectedUser.id}`)
  }, [selectedUser, router])

  const { mutate: handleReviewStatusChange, isPending: reviewLoading } = useMutation({
    mutationKey: ['updateReviewStatus'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => updateReviewStatus(id, status),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['fetchUserReviews', selectedUser?.id] })
      showSuccess('Yorum başarıyla güncellendi')
    },
    onError: err => showErrorMessage(err)
  })

  const { mutate: handleProductApprovalStatusChange, isPending: productLoading } = useMutation({
    mutationKey: ['updateProductApprovalStatus', selectedUser?.id],
    mutationFn: ({ id, status }: { id: number; status: boolean }) =>
      productService.updateProductApprovalStatus(id, status),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['fetchUserProducts', selectedUser?.id] })
      showSuccess('Ürün başarıyla güncellendi')
    },
    onError: err => showErrorMessage(err)
  })

  const { mutate: handleBlockUser } = useMutation({
    mutationKey: ['blockUser', selectedUser?.id],
    mutationFn: (id: number) => userService.blockUser(id),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['fetchUsers'] })
      showSuccess('Kullanıcı başarıyla engellendi')
    },
    onError: err => showErrorMessage(err)
  })

  const { mutate: deleteProduct } = useDeleteProduct()

  const handleDetleteProduct = useCallback(
    async (id: number) => {
      deleteProduct(id, {
        onSuccess: () => {
          reactQueryConfig.invalidateQueries({ queryKey: ['fetchUserProducts', selectedUser?.id] })
          showSuccess('Ürün başarıyla silindi')
          setTimeout(() => window.location.reload(), 2500)
        },
        onError: err => toast.error(err.message)
      })
    },
    [deleteProduct, selectedUser]
  )

  const { mutate: handleChangeOrderStatus } = useMutation({
    mutationKey: ['updateOrderStatus', selectedUser?.id],
    mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['fetchUserOrders', selectedUser?.id] })
      showSuccess('Sipariş başarıyla güncellendi')
    },
    onError: err => showErrorMessage(err)
  })

  const value = useMemo(() => {
    return {
      users,
      selectedUser,
      selectedUserAddress: selectedUserAddress ?? [],
      selectedUserReviews: selectedUserReviews ?? [],
      selectUserProducts: selectUserProducts ?? [],
      selectUserOrders: selectUserOrders ?? [],
      loading: usersLoading,
      productLoading,
      reviewLoading,
      orderLoading,
      setSelectedUser,
      handleReviewStatusChange,
      handleProductApprovalStatusChange,
      handleBlockUser,
      handleDetleteProduct,
      handleChangeOrderStatus
    }
  }, [
    users,
    selectedUser,
    selectedUserAddress,
    selectedUserReviews,
    selectUserProducts,
    selectUserOrders,
    usersLoading,
    productLoading,
    reviewLoading,
    orderLoading,
    setSelectedUser,
    handleReviewStatusChange,
    handleProductApprovalStatusChange,
    handleBlockUser,
    handleDetleteProduct,
    handleChangeOrderStatus
  ])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
