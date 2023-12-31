import { getCart } from '@/services/order/order.service'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useEffect, useRef, useState } from 'react'
import { FaHeart, FaSearch, FaShoppingCart, FaWallet } from 'react-icons/fa'
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
        const toast: IToast = { severity: 'error', summary: 'Hata', detail: message, life: 2000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: 'Başarılı', detail: message, life: 2000 }
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
        setBalance(data.data.balance ?? 0)
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

    const op = useRef(null);
    const opWallet = useRef(null);

    return (
        <div className="px-[15px] mx-auto w-full">
            <div className="grid grid-cols-12 items-center py-4 xl:px-12">
                {/* col-lg-3 d-none d-lg-block */}
                <div className="col-span-3 hidden lg:block">
                    {/* text-decoration-none */}
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <h1 className="m-0 font-semibold text-4xl text-black">
                            <span className="text-primary font-bold border px-3 mr-1">D</span> aily Shop

                        </h1>
                    </a>
                </div>
                {/* col-lg-6 col-6 text-left */}
                <div className="lg:col-span-6 col-span-6 text-left px-[15px]">
                    <form action="">
                        {/* input-group */}
                        <div className="relative flex flex-wrap w-full">
                            {/* form-control height calc(1.5em + 0.75rem + 2px) */}
                            <input type="text" className="
                    relative flex-[1_1_auto] block py-[.375rem] px-3 border border-solid border-secondary rounded-none
                    h-[calc(1.5em + 0.75rem + 2px)] text-[#495057]
                    focus:outline-none w-[1%]" placeholder='Search for products' />
                            {/* input-group-append */}
                            <div className="flex items-center ">
                                <span className="text-primary px-3 py-2 rounded-none border border-solid border-secondary">
                                    <FaSearch className="h-5 w-5" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                {/* col-lg-3 col-6 text-right */}
                <div className="lg:col-span-3 col-span-6 flex w-full justify-end text-right">
                    {/* Cüzdan */}
                    <div className="">
                        {isShowWalletScreen && <WalletSection setIsShowWalletScreen={setIsShowWalletScreen} />}

                        <button className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle mr-1"
                            //@ts-ignore
                            onClick={(e) => { opWallet?.current?.toggle(e); fetchWallet() }}

                        >
                            <FaWallet className="w-6 h-auto inline-block text-primary" />
                            <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">{balance} ₺</span>
                        </button>

                        <OverlayPanel ref={opWallet} className="w-[300px]">

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-2xl font-bold">Cüzdan</h1>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* Cüzdan içeriği */}
                                    <div className="flex flex-row items-center justify-between">
                                        {isAuthorized ?
                                        <div className="flex flex-col">
                                            <h1 className="text-lg font-semibold">Bakiye</h1>
                                            <span className="text-sm text-gray-500">{balance} ₺</span>
                                        </div>
                                        : 
                                        <div className="flex flex-col">
                                            <h1 className="text-lg font-semibold">Bakiyeyi görmek için </h1>
                                            <span className="text-sm text-gray-500"><Link to="/login" className="text-primary">Giriş Yap</Link></span>
                                        </div>
                                        }
                                        <button className="text-primary fawallet"
                                            // onClickte para eklemesi yapılacak
                                            onClick={() => (
                                                isAuthorized ? setIsShowWalletScreen(true) : showErrorMessage('Para eklemek için giriş yapmalısınız')
                                            )}
                                        >
                                            <FaWallet className=" w-6 h-auto inline-block text-primary" />
                                        </button>
                                        <Tooltip target=".fawallet" position="bottom"
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
                    <div className="">

                        <button className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle mr-1"
                            //@ts-ignore
                            onClick={(e) => { op?.current?.toggle(e); fetchFavorites() }}
                        >

                            <FaHeart className="w-6 h-auto inline-block text-primary" />
                            <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">{favoritesList?.length}</span>
                        </button>

                        <OverlayPanel ref={op} className="w-[300px]">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-2xl font-bold">Favoriler</h1>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* Favori ürünlerin listesi */}
                                    {favoritesList?.map((item) => (
                                        <div className="flex flex-row items-center justify-between" key={item.id}>
                                            <Link to={`/product/${item.product.id}`} className="rounded-md overflow-hidden flex flex-row items-center justify-between gap-8">
                                                <img src={item.product.image} alt="" className="w-[50px] h-[50px] rounded-md" />
                                                <div className="flex flex-col">
                                                    <h1 className="text-lg font-semibold">{item.product.name}</h1>
                                                </div>
                                            </Link>
                                            <button className="text-primary" onClick={() => deleteFavorite(item.id)}>
                                                <FaHeart className="w-6 h-auto inline-block text-primary" />
                                            </button>

                                        </div>
                                    ))}

                                </div>



                            </div>
                        </OverlayPanel>
                    </div>
                    {/* Sepet */}
                    <div className="">

                        <Link className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle"
                            to={`/cart`}
                        >
                            <FaShoppingCart className="w-6 h-auto inline-block text-primary" />
                            <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">{cartCount}</span>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Searchbar