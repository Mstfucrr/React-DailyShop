import { IProduct } from '@/shared/types'

export interface IProductInfo {
  name: string
  price: number
  stock: number
  description: string
  status: string
  categoryId: number
  colors: string[] | undefined
  sizes: string[] | undefined
}

export type ProductResponse = {
  message: string
}

export type GetListProduct = {
  data: IProduct[]
  message: string
}

export type GetProductById = {
  data: IProduct
  message: string
}
