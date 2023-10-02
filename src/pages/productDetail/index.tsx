import PageBanner from '@/components/Header/PageBanner'
import Navbar from '@/components/Navbar'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import Searchbar from '@/components/Searchbar'
import { products } from '@/components/shop/example.products'
import Topbar from '@/components/Topbar'
import { getProductById } from '@/services/product/product.service'
import { IProductResponse } from '@/services/product/types'
import { IProduct } from '@/shared/types'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


const ProductDetailPage = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const [product, setProduct] = useState<IProduct | null>(null)

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
            try {
                const res: IProductResponse = await getProductById(id).then(res => {
                    return res
                })
                if (res.data)
                    setProduct(res.data)
                else
                    dispatch(SET_TOAST({ severity: 'error', summary: 'Hatsa', detail: res.message, life: 3000 }))
            } catch (err) {
                const toast: IToast = { severity: "error", summary: "Sistematik Hata", detail: "Bir şeyler ters gitti", life: 3000 } // service çalışmadı 
                dispatch(SET_TOAST(toast))
            }
        }

        fetchData()
    }, [])




    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <PageBanner title="Shop Detail" link="/productDetail" />
            {product &&
                <ProductDetail product={product} />
            }
        </>
    )
}

export default ProductDetailPage