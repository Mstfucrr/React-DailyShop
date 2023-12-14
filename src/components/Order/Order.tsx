import { getCart } from "@/services/order/order.service"
import { ICartItem } from "@/shared/types"
import { authSelector } from "@/store/auth"
import to from "await-to-js"
import { Messages } from "primereact/messages"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import OrderAddress from "./orderAddress"
import { Button } from "primereact/button"
import { AnimatePresence } from "framer-motion"

const Order = () => {
    const msgs = useRef<Messages>(null)
    const [cartItems, setCartItems] = useState<[] | ICartItem[]>([])
    const [cartTotal, setCartTotal] = useState(0)
    const { isAuthorized, auth, token } = useSelector(authSelector)
    const [user, setUser] = useState(auth)
    useEffect(() => {
        setUser(auth)
    }, [])

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

        if (cartItems) {
            let total = 0
            cartItems.map((item: ICartItem) => {
                total += item.product.price * item.quantity
            })
            setCartTotal(total)
        }

    }

    useEffect(() => {
        if (isAuthorized)
            fetchCart()
    }, [])




    return (

        <div className="flex lg:flex-row flex-col xl:px-10 px-3 gap-3 mt-20">

            <AnimatePresence>
                <OrderAddress addresses={user?.addresses} />
                
            </AnimatePresence>


            <div className="flex basis-4/12 p-2">
                <div className="w-full border border-solid border-secondary
                        flex flex-col relative h-min">
                    {/* card header */}
                    <div className="py-3 px-5 bg-secondary">
                        <h4 className="font-semibold text-2xl text-black">
                            Sipariş Özeti
                        </h4>
                    </div>
                    {/* card body */}
                    <div className="flex-auto p-5">
                        <div className="flex flex-col">
                            <h5 className="text-2xl font-semibold mb-2">Ürünler</h5>
                            <div className="flex flex-col gay-4">

                                {cartItems.map((cartItem) => (
                                    <div className="flex justify-between" key={cartItem.product.id + "-" + cartItem.product.name}>
                                        <div className="">
                                            {cartItem.product.name} x {cartItem.quantity}
                                        </div>
                                        <div className="">
                                            {cartItem.product.price * cartItem.quantity} ₺
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="my-4" />
                        <div className="flex justify-between mb-4 pt-1">
                            <h6 className="font-medium text-black">
                                Ara Toplam
                            </h6>
                            <h6 className="font-medium text-black">
                                {cartTotal} ₺
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
                                {cartTotal} ₺
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

            <Button type="submit" label="Sipariçi Tamamla" className="w-max !bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 mt-4
                    hover:!bg-primaryDark hover:!border-primaryDark hover:text-white
                    transition duration-300 ease-in-out flex justify-center"
                onClick={() => console.log(cartItems)}
            />

        </div>

    )
}

export default Order