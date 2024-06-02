import { createOrder, getCart } from '@/services/order/order.service'
import { ICartItem } from '@/shared/types'
import to from 'await-to-js'
import { Messages } from 'primereact/messages'
import { useEffect, useRef, useState } from 'react'
import OrderAddress from './orderAddress'
import { Button } from 'primereact/button'
import { AnimatePresence } from 'framer-motion'
import OrderPayment from './orderPayment'
import { IUserAddress } from '@/services/auth/types'
import { IOrderAddress, IOrderRequest } from '@/services/order/types'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Order = () => {
  const msgs = useRef<Messages>(null)
  const [cartItems, setCartItems] = useState<[] | ICartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  const [selectAddress, setSelectAddress] = useState<IOrderAddress>()
  const [isAddressSelectionConfirmed, setIsAddressSelectionConfirmed] = useState(false)
  const [cardValues, setCardValues] = useState({
    cardNumber: '',
    cardOwner: '',
    LastDate: '',
    cvv: ''
  })
  const router = useRouter()
  const { isAuthorized, auth, token } = useAuth()
  const [user, setUser] = useState(auth)
  useEffect(() => {
    setUser(auth)
  }, [])

  const fetchCart = async () => {
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
    if (data.data) {
      setCartItems(data.data)
      let total = 0
      data.data.map((item: ICartItem) => {
        total += item.product.price * item.quantity
      })
      setCartTotal(total)
    }
  }

  useEffect(() => {
    if (isAuthorized) fetchCart()
  }, [])

  const handleSubmitOrder = async () => {
    console.log(selectAddress)
    console.log(cardValues)
    console.log(cartItems)
    console.log(cartTotal)
    if (!selectAddress) return
    const orderReq: IOrderRequest = {
      addressId: selectAddress?.id,
      creditCard: {
        cardNumber: cardValues.cardNumber,
        cardOwner: cardValues.cardOwner,
        cvv: cardValues.cvv,
        LastDate: cardValues.LastDate
      },
      orderItems: cartItems.map(item => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        }
      })
    }
    console.log(orderReq)

    const [err, data] = await to(createOrder(orderReq, token))
    if (err) return toast.error(err.message)
    toast.success(data.message)
    setTimeout(() => router.push('/account/Siparişlerim'), 1500)
  }

  return (
    <div className='mt-20 flex flex-col gap-3 px-3 lg:flex-row xl:px-10'>
      {user?.addresses?.length === 0 ? (
        <div className='flex h-full w-full items-center justify-center'>
          <div className='flex flex-col items-center gap-5'>
            <h1 className='text-3xl font-semibold'>Adresiniz Bulunmamaktadır</h1>
            <Link
              href={'/account'}
              className='flex w-full justify-center rounded-xl border border-solid border-transparent !bg-primary
                            px-3 py-4 text-[#212529]
                            transition duration-300 ease-in-out hover:!border-primaryDark hover:!bg-primaryDark hover:text-white'
            >
              Lütfen Adres Ekleyiniz
            </Link>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <OrderAddress
            key={'orderAddress'}
            addresses={user?.addresses}
            IsAddressSelectionconfirmed={isAddressSelectionConfirmed}
            selectAddress={selectAddress as IUserAddress}
            setSelectAddress={setSelectAddress}
          />
          {isAddressSelectionConfirmed && (
            <OrderPayment
              key={'orderPayment'}
              cardValues={cardValues}
              setcardValues={setCardValues}
              handleSubmitOrder={handleSubmitOrder}
            />
          )}
        </AnimatePresence>
      )}

      <div className='flex basis-4/12 p-2'>
        <div className='relative flex h-min w-full flex-col border border-solid border-secondary'>
          {/* card header */}
          <div className='bg-secondary px-5 py-3'>
            <h4 className='text-2xl font-semibold text-black'>Sipariş Özeti</h4>
          </div>
          {/* card body */}
          <div className='flex-auto p-5'>
            <div className='flex flex-col'>
              <h5 className='mb-2 text-2xl font-semibold'>Ürünler</h5>
              <div className='gay-4 flex flex-col'>
                {cartItems.map(cartItem => (
                  <div className='flex justify-between' key={'cartItem-' + cartItem.id}>
                    <div className=''>
                      {cartItem.product.name} x {cartItem.quantity}
                    </div>
                    <div className=''>{cartItem.product.price * cartItem.quantity} ₺</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* card footer */}
          <div className='flex flex-col gap-10 border border-solid border-secondary px-5 py-3'>
            <div className='mt-2 flex justify-between text-black'>
              <h5 className='text-xl font-bold'>Toplam</h5>
              <h5 className='text-xl font-bold'>{cartTotal} ₺</h5>
            </div>

            {!isAddressSelectionConfirmed ? (
              <Button
                className='flex w-full justify-center border border-solid border-transparent !bg-primary px-3
                            py-4 text-[#212529] transition
                            duration-300 ease-in-out hover:!border-primaryDark hover:!bg-primaryDark hover:text-white'
                disabled={cartItems.length === 0 || !selectAddress}
                onClick={() => setIsAddressSelectionConfirmed(true)}
              >
                Ödeme İşlemine Geçin
              </Button>
            ) : (
              <Button
                className='flex w-full justify-center border border-solid border-transparent px-3 py-4 text-[#212529] hover:text-white'
                onClick={() => setIsAddressSelectionConfirmed(false)}
                severity='secondary'
                icon='pi pi-arrow-left'
                iconPos='left'
                label='Adres Seçimine Dön'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
