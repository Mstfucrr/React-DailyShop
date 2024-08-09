import { IProduct } from '@/shared/types'
import Image from 'next/image'
import Link from 'next/link'

interface IAddToCartSuccessTemplete {
  product: IProduct | undefined
  quantity: number
  message: string
}

const AddToCartSuccessTemplete = ({ product, quantity, message }: IAddToCartSuccessTemplete) => {
  return (
    <div className='flex flex-col justify-center'>
      <div className='flex gap-2'>
        <Image src={product?.image ?? ''} alt='' className='mx-auto size-20' width={80} height={80} />
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold'>{message}</h2>
          <h3 className='text-md font-semibold'>{product?.name}</h3>
          <h3 className='text-md font-semibold'>
            {quantity} x {product?.price} TL
          </h3>
        </div>
      </div>
      <div className='mt-4 flex flex-row gap-x-2'>
        <Link href='/cart' className='rounded-md bg-primary px-3 py-2 text-white'>
          Sepete Git
        </Link>
        <Link href={`/shop/${product?.categoryId}`} className='rounded-md bg-primary px-3 py-2 text-white'>
          Alışverişe Devam Et
        </Link>
      </div>
    </div>
  )
}

export default AddToCartSuccessTemplete
