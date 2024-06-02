import { useEffect, useRef, useState } from 'react'
import CartListItem from './CartListItem'
import { ICartItem } from '@/shared/types'
import { getCart } from '@/services/order/order.service'
import { Messages } from 'primereact/messages'
import to from 'await-to-js'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

const Cart = () => {
  const [cartItems, setCartItems] = useState<[] | ICartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  const msgs = useRef<Messages>(null)

  const { token } = useAuth()
  const fetchCart = async () => {
    if (!token) return
    console.log('token', token)
    const [err, data] = await to(getCart(token))
    if (err) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: err.message
        }
      ])
      return
    }
    setCartItems(data.data)
    console.log(data.data)
    if (data.data && data.data.length > 0) {
      let total = 0
      data.data.map((item: ICartItem) => {
        total += item.product.price * item.quantity
      })
      setCartTotal(total)
    } else {
      setCartTotal(0)
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'info',
          summary: 'Sepetiniz Boş',
          detail: 'Sepetinizde ürün bulunmamaktadır.',
          closable: false
        }
      ])
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div className='my-24 flex w-full flex-col flex-wrap gap-y-9 px-[15px] md:flex-row lg:px-16'>
      {cartItems && cartItems.length > 0 && (
        <>
          <div className='w-2/3 md:px-9'>
            <table className='mb-0 w-full border-collapse border-0 text-center text-[#6F6F6F]'>
              <thead className='bg-secondary text-black'>
                <tr>
                  <th className='border border-solid border-secondary p-3'>Ürünler</th>
                  <th className='border border-solid border-secondary p-3'>Fiyat</th>
                  <th className='border border-solid border-secondary p-3'>Miktar</th>
                  <th className='border border-solid border-secondary p-3'>Toplam</th>
                  <th className='border border-solid border-secondary p-3'>Kaldır</th>
                </tr>
              </thead>
              <tbody className='align-middle'>
                {cartItems.map(cartItem => (
                  <CartListItem key={cartItem.id} cartItem={cartItem} fetchCart={fetchCart} />
                ))}
              </tbody>
            </table>
          </div>
          <div className='w-1/3'>
            {/* card */}
            <div
              className='relative mb-12 flex h-min
                        flex-col border border-solid border-secondary'
            >
              {/* card header */}
              <div className='bg-secondary px-5 py-3'>
                <h4 className='text-2xl font-semibold text-black'>Sepet Özeti</h4>
              </div>
              {/* card body */}
              <div className='flex-auto p-5'>
                <div className='mb-4 flex justify-between pt-1'>
                  <h6 className='font-medium text-black'>Ara Toplam</h6>
                  <h6 className='font-medium text-black'>{cartTotal} ₺</h6>
                </div>
              </div>
              {/* card footer */}
              <div className='border border-solid border-secondary px-5 py-3'>
                <div className='mt-2 flex justify-between text-black'>
                  <h5 className='text-xl font-bold'>Toplam</h5>
                  <h5 className='text-xl font-bold'>{cartTotal} ₺</h5>
                </div>
                <Link
                  className='mt-4 flex w-full justify-center border border-solid border-transparent bg-primary px-3
                                py-4 text-[#212529] transition
                                duration-300 ease-in-out hover:border-primaryDark hover:bg-primaryDark hover:text-white'
                  href='/checkout'
                >
                  Sepeti Onayla
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {msgs && <Messages ref={msgs} className='ml-24 w-1/2' />}
    </div>
  )
}

export default Cart
