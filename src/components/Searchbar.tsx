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

const Searchbar = () => {


    const { token, isAuthorized } = useSelector(authSelector)
    const [cartCount, setCartCount] = useState<number>(0)
    const [walletCount, setWalletCount] = useState<number>(0)
    const [isShowWalletScreen, setIsShowWalletScreen] = useState<boolean>(false)
    const dispatch = useDispatch()

    const fetchCart = async () => {
        const [err, data] = await to(getCart(token))
        if (err) {
            const toast: IToast = { severity: 'error', summary: 'Hata', detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        setCartCount(data.data?.length > 0 ? data.data.length : 0)
    }

    const fetchWallet = async () => {
        const [err, data] = await to(getWalletByUser(token))
        if (err) {
            const toast: IToast = { severity: 'error', summary: 'Hata', detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        setWalletCount(data.data)
    }

    useEffect(() => {
        if (isAuthorized)
            fetchCart()
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
                <div className="lg:col-span-3 col-span-6 text-right">
                    {/* Cüzdan */}
                    {isShowWalletScreen && <WalletSection setIsShowWalletScreen={setIsShowWalletScreen} /> }

                    <button className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle mr-1"
                        //@ts-ignore
                        onClick={(e) => opWallet?.current?.toggle(e)}
                    >
                        <FaWallet className="w-6 h-auto inline-block text-primary" />
                        <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">{walletCount}</span>
                    </button>
                    {/* Cüzdan */}
                    <OverlayPanel ref={opWallet} className="w-[300px]">

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl font-bold">Cüzdan</h1>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Cüzdan içeriği */}
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-col">
                                        <h1 className="text-lg font-semibold">Bakiye</h1>
                                        <span className="text-sm text-gray-500">0 TL</span>
                                    </div>
                                    <button className="text-primary fawallet"
                                        // onClickte para eklemesi yapılacak
                                        onClick={() => setIsShowWalletScreen(true)}
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


                    {/* Favoriler */}
                    <button className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle mr-1"
                        //@ts-ignore
                        onClick={(e) => op?.current?.toggle(e)}
                    >

                        <FaHeart className="w-6 h-auto inline-block text-primary" />
                        <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">0</span>
                    </button>
                    {/* Favoriler (ürünImage , isim ve kalp) */}
                    <OverlayPanel ref={op} className="w-[300px]">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl font-bold">Favoriler</h1>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Favori ürünlerin listesi */}

                                <div className="flex flex-row items-center justify-between">
                                    <Link to={`/product/1`} className="rounded-md overflow-hidden flex flex-row items-center justify-between gap-8">
                                        <img src="https://picsum.photos/200/300" alt="" className="w-[50px] h-[50px] rounded-md" />
                                        <div className="flex flex-col">
                                            <h1 className="text-lg font-semibold">Ürün İsmi</h1>
                                        </div>
                                    </Link>
                                    <button className="text-primary">
                                        <FaHeart className="w-6 h-auto inline-block text-primary" />
                                    </button>

                                </div>

                            </div>



                        </div>
                    </OverlayPanel>
                    {/* Sepet */}
                    <Link className="border border-secondary inline-block text-center rounded-none select-none py-[.375rem] px-3 align-middle"
                        to={`/cart`}
                    >
                        <FaShoppingCart className="w-6 h-auto inline-block text-primary" />
                        <span className="inline-block py-[.25em] px-[.6em] font-bold text-[75%] relative -top-[1px]">{cartCount}</span>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Searchbar