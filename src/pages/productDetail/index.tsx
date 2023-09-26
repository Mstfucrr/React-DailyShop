import PageBanner from '@/components/Header/PageBanner'
import Navbar from '@/components/Navbar'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import Searchbar from '@/components/Searchbar'
import { products } from '@/components/shop/example.products'
import Topbar from '@/components/Topbar'
import { IProduct } from '@/shared/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const ProductDetailPage = () => {

    const  { id } = useParams() 

    
    const [product, setProduct] = useState<IProduct | undefined>(undefined)

    useEffect(() => {
        if (!id) return
        const product = products.find(product => product.id === parseInt(id as string)) as IProduct
        setProduct(product)
        console.log(product)
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