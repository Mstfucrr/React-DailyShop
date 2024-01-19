import { IProduct } from '@/shared/types'
import { IUser } from '../auth/types'

export interface IaddToCartRequest {
  quantity: number
  size: string | undefined
  color: string | undefined
}

export interface IOrder {
  id: number | undefined
  address: IOrderAddress
  status: OrderStatus
  user: IUser
  totalPrice: number
  orderItems: IOrderItem[]
  date: string
  OrderNumber: string
}

export enum OrderStatus {
  New = 'New',
  Accepted = 'Accepted',
  Preparing = 'Preparing',
  OnShipping = 'OnShipping',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export interface IOrderItem {
  id: number | null
  product: IProduct
  price: number
  quantity: number
  size: string
  color: string
}

export interface IOrderAddress {
  id: number
  title: string
  address: string
  city: string
  country: string
  zipCode: number
}

export interface ICreditCardRequest {
  cardNumber: string
  cardOwner: string
  LastDate: string
  cvv: string
}

export interface ICreditCard extends ICreditCardRequest {
  id: number
}

export interface IOrderRequest {
  addressId: number
  creditCard: ICreditCardRequest
  orderItems: IOrderItemRequest[]
}

export interface IOrderItemRequest {
  productId: number
  quantity: number
  size: string
  color: string
}
