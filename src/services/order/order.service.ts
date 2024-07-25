import {
  CartListResponse,
  IOrderRequest,
  IaddToCartRequest,
  MessageResponse,
  OrderListResponse,
  OrderStatus
} from './types'
import { privateAxiosInstance } from '../base/base'
import { AxiosResponse } from 'axios'

// Cart
const getCart = async (): Promise<AxiosResponse<CartListResponse>> =>
  await privateAxiosInstance.get<CartListResponse>('Carts')

const addToCart = async (productId: number, input: IaddToCartRequest): Promise<AxiosResponse<MessageResponse>> =>
  await privateAxiosInstance.post<MessageResponse>(`Carts?productId=${productId}`, input)

const updateCart = async (id: number, input: any): Promise<AxiosResponse<MessageResponse>> =>
  await privateAxiosInstance.put<MessageResponse>(`Carts/Update/${id}`, input)

const removeFromCart = async (id: number): Promise<AxiosResponse<MessageResponse>> =>
  await privateAxiosInstance.delete<MessageResponse>(`Carts/Delete/${id}`)

// Order
const getOrders = async (): Promise<AxiosResponse<OrderListResponse>> =>
  await privateAxiosInstance.get<OrderListResponse>('Orders')

const createOrder = async (input: IOrderRequest): Promise<AxiosResponse<MessageResponse>> =>
  await privateAxiosInstance.post<MessageResponse>('Orders', input)

const cancelOrder = async (orderId: number): Promise<AxiosResponse<MessageResponse>> =>
  await privateAxiosInstance.put<MessageResponse>(`Orders/${orderId}`, OrderStatus.Cancelled)

export default {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  getOrders,
  createOrder,
  cancelOrder
}
