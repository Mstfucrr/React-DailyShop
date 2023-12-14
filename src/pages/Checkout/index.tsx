import PageBanner from '@/components/Header/PageBanner'
import Navbar from '@/components/Navbar'
import Searchbar from '@/components/Searchbar'
import Topbar from '@/components/Topbar'
import Order from '@/components/Order/Order'

const CheckoutPage = () => {
    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <PageBanner title="Ödeme" link="/checkout" />
            <Order />

        </>
    )
}

export default CheckoutPage