'use client'
import { useEffect, useState } from 'react'
import ProductCard from '../shop/productCard'
import { IProduct } from '@/shared/types'
import { getProductsFromCookie } from '@/helper/cookieUtils'
import { useGetSuggestions } from '@/services/home/Suggestions.service'

const HomeComponent = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const productCookie = getProductsFromCookie() || []

  const { data: productData } = useGetSuggestions(productCookie)

  useEffect(() => {
    if (productData)
      setProducts(
        productData.data
          .filter((product, index, self) => self.findIndex(p => p.id === product.id) === index)
          .slice(0, 4)
      )
  }, [productData])

  return (
    <div>
      <div className='mb-4 mt-14 text-center'>
        {/* senin için seçtiklerimiz */}
        <div className='flex flex-col'>
          <div className='flex items-center justify-center'>
            <div className='h-1 w-11 bg-black' />
            <h2 className='text-center text-4xl font-bold text-gray-800'>
              <span className='px-20'>Senin İçin Seçtiklerimiz</span>
            </h2>
            <div className='h-1 w-11 bg-black' />
          </div>

          <div className='mt-8 flex justify-center px-5 sm:px-24 lg:px-36'>
            <div className='flex flex-row flex-wrap items-center justify-center gap-11'>
              {products.map(product => (
                <ProductCard key={'product-' + product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
        {/* son görüntülenenler */}
      </div>
    </div>
  )
}

export default HomeComponent
