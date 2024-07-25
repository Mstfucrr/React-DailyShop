'use client'

import PageBanner from '@/components/Header/PageBanner'
import Order from '@/components/Order/Order'

const CheckoutPage = () => {
  return (
    <>
      <PageBanner title='Ödeme' link='/checkout' />
      <Order />
    </>
  )
}

export default CheckoutPage
