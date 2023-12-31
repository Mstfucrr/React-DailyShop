import { useEffect, useRef, useState } from 'react'
import CartListItem from './CartListItem'
import { ICartItem } from '@/shared/types'
import { Link } from 'react-router-dom'
import { getCart } from '@/services/order/order.service'
import { Messages } from 'primereact/messages'
import to from 'await-to-js'
import { useSelector } from 'react-redux'
import { authSelector } from '@/store/auth'

const Cart = () => {

    const [cartItems, setCartItems] = useState<[] | ICartItem[]>([])
    const [cartTotal, setCartTotal] = useState(0)
    const msgs = useRef<Messages>(null)

    const { token } = useSelector(authSelector)
    const fetchCart = async () => {
        const [err, data] = await to(getCart(token))
        if (err) {
            msgs.current?.clear()
            msgs.current?.show([
                { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message }
            ]);
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
        }
        else {
            setCartTotal(0)
            msgs.current?.clear()
            msgs.current?.show([
                { sticky: true, severity: 'info', summary: 'Sepetiniz Boş', detail: 'Sepetinizde ürün bulunmamaktadır.', closable: false }
            ]);
        }
    }

    useEffect(() => { fetchCart() }, [])


    return (
        <div className="flex md:flex-row flex-wrap flex-col w-full gap-y-9 lg:px-16 my-24 px-[15px]">
            {cartItems && cartItems.length > 0
                && <>
                    <div className="w-2/3 md:px-9">
                        <table className="w-full text-[#6F6F6F] mb-0 text-center border-0 border-collapse">
                            <thead className="bg-secondary text-black">
                                <tr>
                                    <th className='p-3 border border-solid border-secondary'>Ürünler</th>
                                    <th className='p-3 border border-solid border-secondary'>Fiyat</th>
                                    <th className='p-3 border border-solid border-secondary'>Miktar</th>
                                    <th className='p-3 border border-solid border-secondary'>Toplam</th>
                                    <th className='p-3 border border-solid border-secondary'>Kaldır</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>

                                {cartItems.map((cartItem) => (
                                    <CartListItem key={cartItem.id} cartItem={cartItem} fetchCart={fetchCart} />
                                ))
                                }

                            </tbody>

                        </table>

                    </div>
                    <div className="w-1/3">
                        <form action="" className="mb-12">
                            <div className="relative flex flex-wrap w-full items-stretch">
                                <input className="relative flex-auto p-6 border border-solid outline-none border-secondary
                                    text-[#212529] placeholder-[#212529] placeholder-opacity-50
                                    h-[50px] "
                                    type="text" placeholder="Coupon code" />
                                <div className="-ml-[1px] flex">
                                    <button className="bg-primary border border-solid border-transparent text-[#212529] py-[0.375rem] px-3">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* card */}
                        <div className="mb-12 border border-solid border-secondary
                        flex flex-col relative h-min">
                            {/* card header */}
                            <div className="py-3 px-5 bg-secondary">
                                <h4 className="font-semibold text-2xl text-black">
                                    Sepet Özeti
                                </h4>
                            </div>
                            {/* card body */}
                            <div className="flex-auto p-5">
                                <div className="flex justify-between mb-4 pt-1">
                                    <h6 className="font-medium text-black">
                                        Ara Toplam
                                    </h6>
                                    <h6 className="font-medium text-black">
                                        ${cartTotal}
                                    </h6>
                                </div>
                            </div>
                            {/* card footer */}
                            <div className="border border-solid border-secondary py-3 px-5">
                                <div className="flex justify-between mt-2 text-black">
                                    <h5 className="font-bold text-xl">
                                        Toplam
                                    </h5>
                                    <h5 className="font-bold text-xl">
                                        ${cartTotal}
                                    </h5>
                                </div>
                                <Link className="bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 mt-4 w-full
                                hover:bg-primaryDark hover:border-primaryDark hover:text-white
                                transition duration-300 ease-in-out flex justify-center"
                                    to="/checkout"
                                >
                                    Sepeti Onayla
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            }
            {msgs && <Messages ref={msgs} className="w-1/2 ml-24" />}
        </div >
    )
}

export default Cart