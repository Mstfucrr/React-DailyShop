import PageBanner from '@/components/Header/PageBanner'
import ShopComponent from '@/components/shop'

const Shop = ({ params }) => {
  return (
    <>
      <PageBanner title='Mağaza' link='/shop' />
      <ShopComponent shopId={params.shopId} />
    </>
  )
}

export default Shop
