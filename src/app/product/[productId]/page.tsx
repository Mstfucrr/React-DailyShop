import PageBanner from '@/components/Header/PageBanner'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import { NextPage } from 'next'

const ProductDetailPage: NextPage = ({ params }: { params: { productId: string } }) => {
  return (
    <>
      <PageBanner title='Ürün Detayı' link='/productDetail' />
      <ProductDetail productId={Number(params.productId)} />
    </>
  )
}

export default ProductDetailPage
