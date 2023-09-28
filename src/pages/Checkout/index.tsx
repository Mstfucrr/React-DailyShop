import Checkout from '@/components/Checkout/Checkout'
import PageBanner from '@/components/Header/PageBanner'
import Navbar from '@/components/Navbar'
import Searchbar from '@/components/Searchbar'
import Topbar from '@/components/Topbar'

const CheckoutPage = () => {
    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <PageBanner title="Ödeme" link="/checkout" />
            <Checkout />

        </>
    )
}

export default CheckoutPage