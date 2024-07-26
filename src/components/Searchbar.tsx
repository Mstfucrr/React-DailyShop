import { OverlayPanel } from 'primereact/overlaypanel'
import { useEffect, useRef, useState } from 'react'
import { FaHeart, FaShoppingCart, FaWallet } from 'react-icons/fa'
import { Tooltip } from 'primereact/tooltip'
import WalletSection from './wallet/walletSection'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useGetCart } from '@/services/order/use-cart-service'
import { useGetWalletByUser } from '@/services/wallet/use-wallet'
import { useDeleteFavorite, useGetFavorites } from '@/services/favorites/use-favorites'

const Searchbar = () => {
  const { isAuthorized } = useAuth()
  const [cartCount, setCartCount] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)
  const [favoritesList, setFavoritesList] = useState<any[]>([])
  const [isShowWalletScreen, setIsShowWalletScreen] = useState<boolean>(false)

  const showErrorMessage = (message: string) => toast.error(message)
  const showSuccess = (message: string) => toast.success(message)

  const { data: CartData } = useGetCart()

  const { data: walletData } = useGetWalletByUser()

  const { data: favoritesData } = useGetFavorites()

  const { mutate: deleteFavorite } = useDeleteFavorite()

  useEffect(() => {
    if (CartData) setCartCount(CartData.data?.data.length > 0 ? CartData.data?.data.length : 0)
  }, [CartData])

  useEffect(() => {
    if (favoritesData) setFavoritesList(favoritesData.data.data)
  }, [favoritesData])

  useEffect(() => {
    if (walletData) setBalance(walletData.data.data.balance)
  }, [walletData])

  const handleDeleteFavorite = async (id: number) => {
    deleteFavorite(id, {
      onSuccess: () => showSuccess('Favori ürün başarıyla silindi'),
      onError: (err: any) => showErrorMessage(err.message)
    })
  }

  const op = useRef(null)
  const opWallet = useRef(null)

  return (
    <div className='mx-auto w-full px-[15px]'>
      <div className='flex items-center justify-between py-4 xl:px-12'>
        {/* col-lg-3 d-none d-lg-block */}
        <div className=' hidden w-1/2 lg:block'>
          {/* text-decoration-none */}
          <Link href='/' style={{ textDecoration: 'none' }}>
            <h1 className='m-0 text-4xl font-semibold text-black'>
              <span className='mr-1 border px-3 font-bold text-primary'>D</span> aily Shop
            </h1>
          </Link>
        </div>
        {/* col-lg-3 col-6 text-right */}
        <div className='flex w-full justify-end text-right'>
          {/* Cüzdan */}
          <div className=''>
            {isShowWalletScreen && <WalletSection setIsShowWalletScreen={setIsShowWalletScreen} />}

            <button
              className='mr-1 inline-block select-none rounded-none border border-secondary px-3 py-[.375rem] text-center align-middle'
              onClick={e => (opWallet.current as any)?.toggle(e)}
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
                          <Link href='/login' className='text-primary'>
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
                    <Tooltip target='.fawallet' position='bottom'>
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
              onClick={e => (op.current as any)?.toggle(e)}
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
                        href={`/product/${item.product.id}`}
                        className='flex flex-row items-center justify-between gap-8 overflow-hidden rounded-md'
                      >
                        <img src={item.product.image} alt='' className='h-[50px] w-[50px] rounded-md' />
                        <div className='flex flex-col'>
                          <h1 className='text-lg font-semibold'>{item.product.name}</h1>
                        </div>
                      </Link>
                      <button className='text-primary' onClick={() => handleDeleteFavorite(item.id)}>
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
              href={`/cart`}
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
