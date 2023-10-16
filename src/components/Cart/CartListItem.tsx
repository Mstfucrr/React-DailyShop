import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { ICartItem } from '@/shared/types'
import { removeFromCart } from '@/services/order/order.service'
import to from 'await-to-js'
import { authSelector } from '@/store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'




const CartListItem = (
  { cartItem, setCartItems }: { cartItem: ICartItem, setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>> }
) => {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const [total, setTotal] = useState(0)

  const { token } = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    setTotal((quantity * cartItem.product.price))
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === cartItem.id)
      const newCartItems = [...prev]
      newCartItems[index].quantity = quantity
      return newCartItems
    })
    console.log("q")
  }, [quantity])

  const handleRemoveItem = async (id: number) => {
    
    const [err, data] = await to(removeFromCart(id, token))
    if (err) {
      const res = err as any
      const errorMessage = res?.response?.data?.message || err.message;
      const toast : IToast = { severity : 'error', summary : 'Sistematik Hata', detail : errorMessage, life : 5000 }
      dispatch(SET_TOAST(toast))
      return
    }
    setCartItems(data.data)
  }

  return (
    <tr className='bg-white'>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <img src={cartItem.product.image as string} width={50} alt=""
          className='inline-block object-cover w-12 h-12 rounded-md'
        />
        <span className='ml-3'>{cartItem.product.name}</span>
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        {cartItem.product.price}
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <div className="relative flex flex-nowrap justify-center items-stretch mx-auto max-w-[100px]">

          <div>
            <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6 
                  hover:text-white hover:bg-primaryDark transition-all
                  duration-300 ease-in-out'
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}

            >
              <FaMinus className='' />
            </button>
          </div>

          <input type="text" className='relative w-[1%] flex-[1_1_auto] text-center bg-secondary py-1 px-2
                outline-none text-sm'
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min={1}
          />
          <div>
            <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6 
                  hover:text-white hover:bg-primaryDark transition-all
                  duration-300 ease-in-out'
              onClick={() => setQuantity(quantity + 1)}

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
          onClick={() => { handleRemoveItem(cartItem.id) }}
        >
          <FaTimes className='' />
        </button>

      </td>
    </tr>
  )
}

export default CartListItem