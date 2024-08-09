import { ICartItem } from '@/shared/types'
import { Messages } from 'primereact/messages'
import { useEffect, useRef, useState } from 'react'
import OrderAddress from './orderAddress'
import { Button } from 'primereact/button'
import { AnimatePresence } from 'framer-motion'
import OrderPayment from './orderPayment'
import { IUserAddress } from '@/services/auth/types'
import { IOrderAddress, IOrderRequest } from '@/services/order/types'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useGetCart } from '@/services/order/use-cart-service'
import { useCreateOrder } from '@/services/order/use-order-service'
import { ProgressSpinner } from 'primereact/progressspinner'

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
  const { data: getCartData, error: getCartError, isLoading: getCartLoading } = useGetCart()
  const { mutate: createOrder } = useCreateOrder()

  const { auth: user } = useAuth()

  useEffect(() => {
    if (getCartError) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Sistematik Hata',
          detail: getCartError.message
        }
      ])
      return
    }
    const cartData = getCartData?.data.data
    if (cartData) {
      setCartItems(cartData)
      let total = 0
      cartData.map((item: ICartItem) => {
        total += item.product.price * item.quantity
      })
      setCartTotal(total)
    }
  }, [getCartData, getCartError])

  const handleSubmitOrder = async () => {
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
    createOrder({ orderReq: orderReq })
  }

  return (
    <div className='mt-20 flex flex-col gap-3 px-3 lg:flex-row xl:px-10'>
      {user?.addresses?.length === 0 ? (
        <div className='flex size-full items-center justify-center'>
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
                {cartItems.length === 0 && <div className='text-center'>Sepetinizde ürün bulunmamaktadır.</div>}
                {getCartLoading && (
                  <div className='flex justify-center'>
                    <ProgressSpinner />
                  </div>
                )}
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
