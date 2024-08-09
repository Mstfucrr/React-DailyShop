import { createContext } from 'react'

interface IProductContext {
  products: any[]
  loading: boolean
  fetchProducts: () => Promise<void>
  handleProductApprovalStatusChange: (data: any, status: boolean) => Promise<void>
  handleDetleteProduct: (id: number) => Promise<void>
  handleChangeOrderStatus: (orderId: number, status: any) => Promise<void>
}

const defaultProvider: IProductContext = {
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
