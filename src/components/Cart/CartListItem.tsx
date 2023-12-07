import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'
import { ICartItem } from '@/shared/types'
import { removeFromCart, updateCart } from '@/services/order/order.service'
import to from 'await-to-js'
import { authSelector } from '@/store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'




const CartListItem = (
  { cartItem, setCartItems, fetchCart }: { cartItem: ICartItem, setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>, fetchCart: () => void }
) => {

  const [quantity, setQuantity] = useState(cartItem.quantity)
  const [total, setTotal] = useState(0)

  const { token } = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    setTotal(cartItem.product.price * quantity)
  }, [quantity, cartItem])


  const handleUpdateItem = async (quantity: number) => {
    setQuantity(quantity)
    const [err, data] = await to(updateCart(cartItem.id, { "quantity": quantity }, token))
    if (err) {
      const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
      dispatch(SET_TOAST(toast))
    }
    fetchCart()
    const toast: IToast = { severity: 'success', summary: "Başarılı", detail: data.message, life: 3000 }
    dispatch(SET_TOAST(toast))
  }

  const handleRemoveItem = async () => {

    const [err, data] = await to(removeFromCart(cartItem.id, token))
    if (err) {
      const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
      dispatch(SET_TOAST(toast))
    }
    fetchCart()
    const toast: IToast = { severity: 'success', summary: "Başarılı", detail: data.message, life: 3000 }
    dispatch(SET_TOAST(toast))
  }

  return (
    <tr className='bg-white'>
      <td className='p-3 border border-solid border-secondary text-left pl-10'>
        <img src={cartItem?.product?.image as string} width={50} alt=""
          className='inline-block object-cover w-12 h-12 rounded-md'
        />
        <span className='ml-3'>{cartItem?.product?.name}</span>
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        {cartItem?.product?.price}
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <div className="relative flex flex-nowrap justify-center items-stretch mx-auto max-w-[100px]">

          <div>
            <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6 
                  hover:text-white hover:bg-primaryDark transition-all
                  duration-300 ease-in-out'
              onClick={() => {
                if (quantity > 1)
                  handleUpdateItem(quantity - 1)
                else
                  handleRemoveItem()
              }}
            >
              {quantity === 1 ? <FaTrash /> : <FaMinus />}
            </button>
          </div>

          <p className='relative w-[1%] flex-[1_1_auto] text-center bg-secondary py-1 px-2
                outline-none text-sm'
          >
            {quantity}
          </p>
          <div>
            <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6 
                  hover:text-white hover:bg-primaryDark transition-all
                  duration-300 ease-in-out'
              onClick={() => {
                handleUpdateItem(quantity + 1)
              }}
            >
              <FaPlus className='' />
            </button>
          </div>

        </div>
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        ${total}
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6
              hover:text-white hover:bg-primaryDark transition-all
              duration-300 ease-in-out'
          onClick={handleRemoveItem}
        >
          <FaTimes className='' />
        </button>

      </td>
    </tr>
  )
}

export default CartListItem