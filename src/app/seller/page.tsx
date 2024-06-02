import PageBanner from '@/components/Header/PageBanner'
import Seller from '@/components/Seller/Seller'

const SellerPage = () => {
  return (
    <>
      <PageBanner title='Satış Yap' link='/seller' />
      <Seller />
    </>
  )
}

export default SellerPage
