import Cart from "@/components/Cart"
import PageBanner from "@/components/Header/PageBanner"
import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import Topbar from "@/components/Topbar"



const index = () => {



    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <PageBanner title="ALIŞVERİŞ SEPETİ" link="/cart" />
            <Cart />
        </>
    )
}

export default index