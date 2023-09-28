import { useEffect, useState } from 'react'
import { products } from '../shop/example.products'
import CartListItem from './CartListItem'
import { ICartItem } from '@/shared/types'
import { cartItemsExample } from '@/components/Shop/example.products'
import { Link } from 'react-router-dom'

const Cart = () => {

    const [cartItems, setCartItems] = useState<ICartItem[]>(cartItemsExample)
    const [cartTotal, setCartTotal] = useState(
        cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0)
    )

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0))
    }, [cartItems])

    return (
        <div className="grid lg:grid-rows-1 grid-rows-2 grid-flow-col lg:px-16 gap-9 my-24 px-[15px]">
            <div className="grid lg:col-span-12 col-span-12">
                <table className="w-100 text-[#6F6F6F] mb-0 text-center border-0 border-collapse">
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
                        {
                            cartItems.map((cartItem) => (
                                <CartListItem key={cartItem.id} cartItem={cartItem} setCartItems={setCartItems} />
                            ))
                        }
                    </tbody>

                </table>
            </div>
            <div className="grid lg:col-span-4 col-span-12">
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
                            Ödeme İşlemine Geçin
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart