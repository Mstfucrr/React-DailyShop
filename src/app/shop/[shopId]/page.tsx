import PageBanner from '@/components/Header/PageBanner'
import ShopComponent from '@/components/shop'
import { NextPage } from 'next'

const Shop: NextPage = ({ params }: { params: { shopId: string } }) => {
  return (
    <>
      <PageBanner title='Mağaza' link='/shop' />
      <ShopComponent shopId={Number(params.shopId)} />
    </>
  )
}

export default Shop
