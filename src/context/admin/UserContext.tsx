'use client'
// src\context\admin\UserContext.tsx
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { IUser, IUserAddress } from '@/services/auth/types'
import { IProduct, IReview } from '@/shared/types'
import { IOrder, OrderStatus } from '@/services/order/types'
import to from 'await-to-js'
import { productService, userService } from '@/services/admin/admin.service'

export type UserContextType = {
  users: IUser[]
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
  fetchUserReviews: () => Promise<void>
  fetchUserProducts: () => Promise<void>
  fetchUserOrders: () => Promise<void>
  handleReviewStatusChange: (data: IReview, status: string) => Promise<void>
  handleProductApprovalStatusChange: (data: IProduct, status: boolean) => Promise<void>
  handleBlockUser: (id: number) => Promise<void>
  handleDetleteProduct: (id: number) => Promise<void>
  handleChangeOrderStatus: (orderId: number, status: OrderStatus) => Promise<void>
}

const initialState: UserContextType = {
  users: [],
  selectedUser: undefined,
  selectedUserAddress: [],
  selectedUserReviews: [],
  selectUserProducts: [],
  selectUserOrders: [],
  loading: false,
  productLoading: false,
  reviewLoading: false,
  orderLoading: false,
  setSelectedUser: () => null,
  fetchUserReviews: () => Promise.resolve(),
  fetchUserProducts: () => Promise.resolve(),
  fetchUserOrders: () => Promise.resolve(),
  handleReviewStatusChange: () => Promise.resolve(),
  handleProductApprovalStatusChange: () => Promise.resolve(),
  handleBlockUser: () => Promise.resolve(),
  handleDetleteProduct: () => Promise.resolve(),
  handleChangeOrderStatus: () => Promise.resolve()
}

export const UserContext = createContext<UserContextType>(initialState)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth()

  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [selectedUserAddress, setSelectedUserAddress] = useState<IUserAddress[]>([])
  const [selectedUserReviews, setSelectedUserReviews] = useState<IReview[]>([])
  const [selectUserProducts, setSelectUserProducts] = useState<IProduct[]>([])
  const [selectUserOrders, setSelectUserOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [productLoading, setProductLoading] = useState<boolean>(false)
  const [reviewLoading, setReviewLoading] = useState<boolean>(false)
  const [orderLoading, setOrderLoading] = useState<boolean>(false)
  const params = useSearchParams()
  const router = useRouter()
  const showErrorMessage = (err: Error) => toast.error(err.message)

  const showSuccess = (message: string) => toast.success(message)

  const fetchUsers = useCallback(async () => {
    console.log('fetching users')
    const [err, data] = await to(userService.fetchUsers(token))
    if (err) {
      showErrorMessage(err)
      return
    }
    setUsers(data.data)
    setLoading(false)
  }, [showErrorMessage, token])

  useEffect(() => {
    setLoading(true)
    fetchUsers()
    const userId = params.get('userId')
    if (userId && users.length > 0 && !selectedUser) {
      const user = users.find(u => u.id === Number(userId))
      setSelectedUser(user)
    }
  }, [])

  const fetchUserAddress = useCallback(async () => {
    if (!selectedUser) return
    const [err, data] = await to(userService.fetchAddressByUserId(selectedUser?.id, token))
    if (err) {
      showErrorMessage(err)
      return
    }
    setSelectedUserAddress(data)
  }, [])

  const fetchUserReviews = useCallback(async () => {
    setSelectedUserReviews([])
    setReviewLoading(true)
    if (!selectedUser) return
    const [err, data] = await to(userService.fetchReviewsByUserId(selectedUser?.id, token))
    if (err) {
      setReviewLoading(false)
      showErrorMessage(err)
      return
    }
    setReviewLoading(false)
    setSelectedUserReviews(data.data)
  }, [])

  const fetchUserProducts = useCallback(async () => {
    setProductLoading(true)
    setSelectUserProducts([])
    if (!selectedUser) return
    const [err, data] = await to(userService.fetchPaddingProductByUserId(selectedUser?.id, token))
    if (err) {
      setProductLoading(false)
      showErrorMessage(err)
      return
    }
    setProductLoading(false)
    setSelectUserProducts(data.data)
  }, [selectedUser])

  const fetchUserOrders = useCallback(async () => {
    setOrderLoading(true)
    setSelectUserOrders([])
    if (!selectedUser) return
    const [err, data] = await to(userService.fetchOrdersByUserId(selectedUser?.id, token))
    if (err) {
      setOrderLoading(false)
      showErrorMessage(err)
      return
    }
    setOrderLoading(false)
    setSelectUserOrders(data.data)
  }, [])

  useEffect(() => {
    if (selectedUser) {
      fetchUserAddress()
      fetchUserReviews()
      fetchUserProducts()
      fetchUserOrders()
      router.push(`/admin/users?userId=${selectedUser.id}`)
    }
  }, [])

  const handleReviewStatusChange = async (data: IReview, status: string) => {
    const [err, data2] = await to(userService.updateReviewStatus(data.id, status, token))
    if (err) {
      showErrorMessage(err)
      return
    }
    showSuccess(data2.message)
  }

  const handleProductApprovalStatusChange = useCallback(async (data: IProduct, status: boolean) => {
    const [err, data2] = await to(userService.updateProductApprovalStatus(data.id, status, token))
    if (err) {
      showErrorMessage(err)
      return
    }
    showSuccess(data2.message)
    fetchUserProducts()
  }, [])

  const handleBlockUser = useCallback(async (id: number) => {
    const [err, data] = await to(userService.blockUser(id, token))
    if (err) {
      showErrorMessage(err)
      return
    }
    showSuccess(data.message)
    fetchUsers()
  }, [])

  const handleDetleteProduct = async (id: number) => {
    const [err, data] = await to(productService.deleteProduct(id, token))
    if (err) {
      showErrorMessage(err)
      return
    }
    showSuccess(data.message)
    fetchUserProducts()
  }

  const handleChangeOrderStatus = async (orderId: number, status: OrderStatus) => {
    const [err, data2] = await to(userService.updateOrderStatus(orderId, status, token))
    if (err) {
      showErrorMessage(err)
      return
    }
    showSuccess(data2.message)
    fetchUserOrders()
  }

  const value: UserContextType = useMemo(() => {
    return {
      users,
      selectedUser,
      selectedUserAddress,
      selectedUserReviews,
      selectUserProducts,
      selectUserOrders,
      loading,
      productLoading,
      reviewLoading,
      orderLoading,
      setSelectedUser,
      fetchUserReviews,
      fetchUserProducts,
      fetchUserOrders,
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
    loading,
    productLoading,
    reviewLoading,
    orderLoading,
    setSelectedUser,
    fetchUserReviews,
    fetchUserProducts,
    fetchUserOrders,
    handleReviewStatusChange,
    handleProductApprovalStatusChange,
    handleBlockUser,
    handleDetleteProduct,
    handleChangeOrderStatus
  ])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useAdimnUser = () => useContext(UserContext)
