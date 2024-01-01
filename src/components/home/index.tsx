import { useEffect, useState } from "react"
import ProductCard from "../shop/productCard"
import { getProductsFromCookie } from "@/helper/cookieUtils"
import { IProduct } from "@/shared/types"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import { useDispatch, useSelector } from "react-redux"
import to from "await-to-js"
import { authSelector } from "@/store/auth"
import { getSuggestions } from "@/services/home/Suggestions.service"
import { getProductsByCategoryId } from "@/services/shop/shop.service"

const HomeComponent = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [productCookie, setProductCookie] = useState<{ productId: number, durationInSeconds: number }[]>([])

    const dispatch = useDispatch()

    const { token } = useSelector(authSelector)

    const showErrorMessage = (message: string) => {
        const toast: IToast = { severity: 'error', summary: "Hata", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }

    const fetchProducts = async () => {
        // const [err, data] = await to(getSuggestions(token, productCookie))
        const [err, data] = await to(getProductsByCategoryId(1, true, token))
        if (err) return
        if (data)
            setProducts(data.data)
    }
    useEffect(() => {
        setProductCookie(getProductsFromCookie)
        fetchProducts()
    }, [])

    return (
        <div>
            <div className="text-center mt-14 mb-4">
                {/* senin için seçtiklerimiz */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-center">
                        <div className="w-11 bg-black h-1" />
                        <h2 className="text-4xl font-bold text-gray-800 text-center">
                            <span className="px-20">Senin İçin Seçtiklerimiz</span>
                        </h2>
                        <div className="w-11 bg-black h-1" />
                    </div>

                    <div className="flex justify-center mt-8 lg:px-36 sm:px-24 px-5">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-11">
                            {products.map((product) => (
                                <ProductCard key={"product-" + product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* son görüntülenenler */}
            </div>
        </div>
    )
}

export default HomeComponent