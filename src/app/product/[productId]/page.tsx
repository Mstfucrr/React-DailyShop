'use client'
import PageBanner from '@/components/Header/PageBanner'
import ProductDetail from '@/components/ProductDetail/ProductDetail'

const ProductDetailPage = ({ params }: { params: { productId: string } }) => {
  return (
    <>
      <PageBanner title='Ürün Detayı' link='/productDetail' />
      <ProductDetail productId={params.productId} />
    </>
  )
}

export default ProductDetailPage
