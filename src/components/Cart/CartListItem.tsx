import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'
import { ICartItem } from '@/shared/types'
import Link from 'next/link'
import { useRemoveFromCart, useUpdateCart } from '@/services/order/use-cart-service'
import Image from 'next/image'

const CartListItem = ({ cartItem }: { cartItem: ICartItem }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const [total, setTotal] = useState(0)

  const { mutate: updateCart } = useUpdateCart()
  const { mutate: removeFromCart } = useRemoveFromCart()

  useEffect(() => {
    setTotal(cartItem.product.price * quantity)
  }, [quantity, cartItem])

  const handleUpdateItem = (quantity: number) => {
    if (quantity === 0) return handleRemoveItem()
    setQuantity(quantity)
    updateCart({ id: cartItem.id, input: { quantity } })
  }

  const handleRemoveItem = () => removeFromCart({ id: cartItem.id })

  return (
    <tr className='bg-white'>
      <td className='border border-solid border-secondary p-3 pl-10 text-left '>
        <div className='flex h-full flex-row flex-wrap items-center justify-between gap-6'>
          <Link
            href={`/product/${cartItem?.product?.id}`}
            className='text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:text-red-800'
          >
            <Image
              src={cartItem?.product?.image as string}
              width={64}
              height={64}
              alt=''
              className='inline-block h-auto w-16 rounded-md object-cover'
            />
            <span className='ml-3'>{cartItem?.product?.name}</span>
          </Link>
          <div className=''>
            <p className='mt-2 block text-sm'>Renk: {cartItem?.color}</p>
            <p className='mt-2 block text-sm'>Beden: {cartItem?.size}</p>
          </div>
        </div>
      </td>
      <td className='border border-solid border-secondary p-3 align-middle'>{cartItem?.product?.price} ₺</td>
      <td className='border border-solid border-secondary p-3 align-middle'>
        <div className='relative mx-auto flex max-w-[100px] flex-nowrap items-stretch justify-center'>
          <div>
            <button
              className='inline-block border-primary bg-primary px-2 py-2 leading-6 text-[#212529] 
                  transition-all duration-300 ease-in-out
                  hover:bg-primaryDark hover:text-white'
              onClick={() => {
                handleUpdateItem(quantity - 1)
              }}
            >
              {quantity === 1 ? <FaTrash /> : <FaMinus />}
            </button>
          </div>

          <p
            className='relative w-[1%] flex-[1_1_auto] bg-secondary px-2 py-1 text-center
                text-sm outline-none'
          >
            {quantity}
          </p>
          <div>
            <button
              className='inline-block border-primary bg-primary px-2 py-2 leading-6 text-[#212529] 
                  transition-all duration-300 ease-in-out
                  hover:bg-primaryDark hover:text-white'
              onClick={() => {
                handleUpdateItem(quantity + 1)
              }}
            >
              <FaPlus className='' />
            </button>
          </div>
        </div>
      </td>
      <td className='border border-solid border-secondary p-3 align-middle'>{total} ₺</td>
      <td className='border border-solid border-secondary p-3 align-middle'>
        <button
          className='inline-block border-primary bg-primary px-2 py-2 leading-6 text-[#212529]
              transition-all duration-300 ease-in-out
              hover:bg-primaryDark hover:text-white'
          onClick={handleRemoveItem}
        >
          <FaTimes className='' />
        </button>
      </td>
    </tr>
  )
}

export default CartListItem
