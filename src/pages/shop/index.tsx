import PageBanner from '@/components/Header/PageBanner'
import Navbar from '@/components/Navbar'
import Searchbar from '@/components/Searchbar'
import Shop from '@/components/shop'
import Topbar from '@/components/Topbar'

type Props = {}

const index = (props: Props) => {
    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <PageBanner title="Shop" link="/shop" />
            <Shop />
        </>
    )
}

export default index