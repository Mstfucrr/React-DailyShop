import { getCart } from '@/services/order/order.service'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useEffect, useRef, useState } from 'react'
import { FaHeart, FaShoppingCart, FaWallet } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tooltip } from 'primereact/tooltip'
import { getWalletByUser } from '@/services/wallet/wallet.service'
import WalletSection from './wallet/walletSection'
import { favoritesService } from '@/services/favorites/favorites.service'

const Searchbar = () => {
  const { token, isAuthorized } = useSelector(authSelector)
  const [cartCount, setCartCount] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)
  const [favoritesList, setFavoritesList] = useState<any[]>([])
  const [isShowWalletScreen, setIsShowWalletScreen] = useState<boolean>(false)

  const dispatch = useDispatch()

  const showErrorMessage = (message: string) => {
    const toast: IToast = {
      severity: 'error',
      summary: 'Hata',
      detail: message,
      life: 2000
    }
    dispatch(SET_TOAST(toast))
  }
  const showSuccess = (message: string) => {
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: message,
      life: 2000
    }
    dispatch(SET_TOAST(toast))
  }

  const fetchCart = async () => {
    const [err, data] = await to(getCart(token))
    if (err) return showErrorMessage(err.message)
    setCartCount(data.data?.length > 0 ? data.data.length : 0)
  }

  const fetchWallet = async () => {
    const [err, data] = await to(getWalletByUser(token))
    if (err) return
    if (data.data) setBalance(data.data.balance ?? 0)
  }

  const fetchFavorites = async () => {
    const [err, data] = await to(favoritesService.getFavorites(token))
    if (err) return showErrorMessage(err.message)
    setFavoritesList(data.data)
  }

  const deleteFavorite = async (id: number) => {
    const [err, data] = await to(favoritesService.deleteFavorite(token, id))
    if (err) return showErrorMessage(err.message)
    setFavoritesList(data.data)
    fetchFavorites()
    showSuccess(data.message)
  }

  useEffect(() => {
    if (isAuthorized) {
      fetchCart()
      fetchWallet()
      fetchFavorites()
    }
  }, [])

  const op = useRef(null)
  const opWallet = useRef(null)

  return (
    <div className='mx-auto w-full px-[15px]'>
      <div className='flex items-center justify-between py-4 xl:px-12'>
        {/* col-lg-3 d-none d-lg-block */}
        <div className=' hidden w-1/2 lg:block'>
          {/* text-decoration-none */}
          <a href='/' style={{ textDecoration: 'none' }}>
            <h1 className='m-0 text-4xl font-semibold text-black'>
              <span className='mr-1 border px-3 font-bold text-primary'>D</span> aily Shop
            </h1>
          </a>
        </div>
        {/* col-lg-3 col-6 text-right */}
        <div className='flex w-full justify-end text-right'>
          {/* Cüzdan */}
          <div className=''>
            {isShowWalletScreen && <WalletSection setIsShowWalletScreen={setIsShowWalletScreen} />}

            <button
              className='mr-1 inline-block select-none rounded-none border border-secondary px-3 py-[.375rem] text-center align-middle'
              //@ts-ignore
              onClick={e => {
                opWallet?.current?.toggle(e)
                fetchWallet()
              }}
            >
              <FaWallet className='inline-block h-auto w-6 text-primary' />
              <span className='relative -top-[1px] inline-block px-[.6em] py-[.25em] text-[75%] font-bold'>
                {balance} ₺
              </span>
            </button>

            <OverlayPanel ref={opWallet} className='w-[300px]'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-center justify-between'>
                  <h1 className='text-2xl font-bold'>Cüzdan</h1>
                </div>
                <div className='flex flex-col gap-4'>
                  {/* Cüzdan içeriği */}
                  <div className='flex flex-row items-center justify-between'>
                    {isAuthorized ? (
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-semibold'>Bakiye</h1>
                        <span className='text-sm text-gray-500'>{balance} ₺</span>
                      </div>
                    ) : (
                      <div className='flex flex-col'>
                        <h1 className='text-lg font-semibold'>Bakiyeyi görmek için </h1>
                        <span className='text-sm text-gray-500'>
                          <Link to='/login' className='text-primary'>
                            Giriş Yap
                          </Link>
                        </span>
                      </div>
                    )}
                    <button
                      className='fawallet text-primary'
                      // onClickte para eklemesi yapılacak
                      onClick={() =>
                        isAuthorized
                          ? setIsShowWalletScreen(true)
                          : showErrorMessage('Para eklemek için giriş yapmalısınız')
                      }
                    >
                      <FaWallet className=' inline-block h-auto w-6 text-primary' />
                    </button>
                    <Tooltip
                      target='.fawallet'
                      position='bottom'
                      //@ts-ignore
                    >
                      Para Ekle
                    </Tooltip>
                  </div>
                </div>
              </div>
            </OverlayPanel>
          </div>

          {/* Favoriler */}
          <div className=''>
            <button
              className='mr-1 inline-block select-none rounded-none border border-secondary px-3 py-[.375rem] text-center align-middle'
              //@ts-ignore
              onClick={e => {
                op?.current?.toggle(e)
                fetchFavorites()
              }}
            >
              <FaHeart className='inline-block h-auto w-6 text-primary' />
              <span className='relative -top-[1px] inline-block px-[.6em] py-[.25em] text-[75%] font-bold'>
                {favoritesList?.length}
              </span>
            </button>

            <OverlayPanel ref={op} className='w-[300px]'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-center justify-between'>
                  <h1 className='text-2xl font-bold'>Favoriler</h1>
                </div>
                <div className='flex flex-col gap-4'>
                  {/* Favori ürünlerin listesi */}
                  {favoritesList?.map(item => (
                    <div className='flex flex-row items-center justify-between' key={item.id}>
                      <Link
                        to={`/product/${item.product.id}`}
                        className='flex flex-row items-center justify-between gap-8 overflow-hidden rounded-md'
                      >
                        <img src={item.product.image} alt='' className='h-[50px] w-[50px] rounded-md' />
                        <div className='flex flex-col'>
                          <h1 className='text-lg font-semibold'>{item.product.name}</h1>
                        </div>
                      </Link>
                      <button className='text-primary' onClick={() => deleteFavorite(item.id)}>
                        <FaHeart className='inline-block h-auto w-6 text-primary' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </OverlayPanel>
          </div>
          {/* Sepet */}
          <div className=''>
            <Link
              className='inline-block select-none rounded-none border border-secondary px-3 py-[.375rem] text-center align-middle'
              to={`/cart`}
            >
              <FaShoppingCart className='inline-block h-auto w-6 text-primary' />
              <span className='relative -top-[1px] inline-block px-[.6em] py-[.25em] text-[75%] font-bold'>
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Searchbar
