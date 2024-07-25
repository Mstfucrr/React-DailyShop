'use client'
import Cart from '@/components/Cart'
import PageBanner from '@/components/Header/PageBanner'

const index = () => {
  return (
    <>
      <PageBanner title='ALIŞVERİŞ SEPETİ' link='/cart' />
      <Cart />
    </>
  )
}

export default index
