import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'
import { ICartItem } from '@/shared/types'
import { removeFromCart, updateCart } from '@/services/order/order.service'
import to from 'await-to-js'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import Link from 'next/link'

const CartListItem = ({ cartItem, fetchCart }: { cartItem: ICartItem; fetchCart: () => void }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const [total, setTotal] = useState(0)

  const { token } = useAuth()

  useEffect(() => {
    setTotal(cartItem.product.price * quantity)
  }, [quantity, cartItem])

  const handleUpdateItem = async (quantity: number) => {
    setQuantity(quantity)
    const [err, data] = await to(updateCart(cartItem.id, { quantity: quantity }, token))
    if (err) toast.error(err.message)
    toast.success(data.message)
  }

  const handleRemoveItem = async () => {
    const [err, data] = await to(removeFromCart(cartItem.id, token))
    if (err) toast.error(err.message)
    toast.success(data.message)
  }

  return (
    <tr className='bg-white'>
      <td className='border border-solid border-secondary p-3 pl-10 text-left '>
        <div className='flex h-full flex-row flex-wrap items-center justify-between gap-6'>
          <Link
            href={`/product/${cartItem?.product?.id}`}
            className='text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:text-red-800'
          >
            <img
              src={cartItem?.product?.image as string}
              width={50}
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
                if (quantity > 1) handleUpdateItem(quantity - 1).then(fetchCart)
                else handleRemoveItem().then(fetchCart)
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
                handleUpdateItem(quantity + 1).then(fetchCart)
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
          onClick={() => {
            handleRemoveItem().then(fetchCart)
          }}
        >
          <FaTimes className='' />
        </button>
      </td>
    </tr>
  )
}

export default CartListItem
