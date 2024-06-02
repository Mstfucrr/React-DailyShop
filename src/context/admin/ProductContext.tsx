/*
  const handleDetleteProduct = async (id: number) => {
    const [err, data] = await to(productService.deleteProduct(id, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
    fetchUserProducts()
  }

  const handleChangeOrderStatus = async (orderId: number, status: OrderStatus) => {
    const [err, data2] = await to(userService.updateOrderStatus(orderId, status, token))
    if (err) return showErrorMessage(err)
    showSuccess(data2.message)
    fetchUserOrders()
  }
*/

import { createContext } from 'react'

interface IProductContext {
  products: any[]
  loading: boolean
  fetchProducts: () => Promise<void>
  handleProductApprovalStatusChange: (data: any, status: boolean) => Promise<void>
  handleDetleteProduct: (id: number) => Promise<void>
  handleChangeOrderStatus: (orderId: number, status: any) => Promise<void>
}

export const defaultProvider: IProductContext = {
  products: [],
  loading: false,
  fetchProducts: () => Promise.resolve(),
  handleProductApprovalStatusChange: () => Promise.resolve(),
  handleDetleteProduct: () => Promise.resolve(),
  handleChangeOrderStatus: () => Promise.resolve()
}

const ProductContext = createContext(defaultProvider)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  return <ProductContext.Provider value={defaultProvider}>{children}</ProductContext.Provider>
}
