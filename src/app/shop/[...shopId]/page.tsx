'use client'
import PageBanner from '@/components/Header/PageBanner'
import ShopComponent from '@/components/shop'
import { useEffect } from 'react'

const Shop = ({ params }: { params: { shopId: string } }) => {
  useEffect(() => {
    console.log('params', params)
    console.log('shopId', params.shopId)
  }, [params])
  return (
    <>
      <PageBanner title='Mağaza' link='/shop' />
      <ShopComponent shopId={params.shopId} />
    </>
  )
}

export default Shop
