import Navbar from '@/components/Navbar'
import Searchbar from '@/components/Searchbar'
import Topbar from '@/components/Topbar'
import Account from '@/components/account/account'

const AccountPage = () => {
    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />

            <Account />
             
        </>
    )
}

export default AccountPage