import { IUser } from "@/services/auth/types"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import UserInformation from "./userInformation"
import { useSelector } from "react-redux"
import { authSelector } from "@/store/auth"
import UserProducts from "./userProducts"
import UserOrders from "./userOrders"
import { Link, useParams } from "react-router-dom"


const Account = () => {

    const { tab } = useParams()
    enum AccountTabs {
        USER_INFO = "Kullanıcı Bilgilerim",
        USER_ORDERS = "Siparişlerim",
        USER_PRODUCTS = "Ürünlerim"
    }
    const [activeTab, setActiveTab] = useState<AccountTabs>(AccountTabs.USER_INFO)

    const [user, setUser] = useState<IUser | null>(null)
    const { auth } = useSelector(authSelector)

    useEffect(() => {
        if (auth)
            setUser(auth)
    }, [])

    useEffect(() => {
        if (tab) {
            switch (tab) {
                case AccountTabs.USER_INFO:
                    setActiveTab(AccountTabs.USER_INFO)
                    break;
                case AccountTabs.USER_ORDERS:
                    setActiveTab(AccountTabs.USER_ORDERS)
                    break;
                case AccountTabs.USER_PRODUCTS:
                    setActiveTab(AccountTabs.USER_PRODUCTS)
                    break;
                default:
                    break;
            }
        }
    }, [tab])

    const renderTabsButtons = (label: string, value: AccountTabs) => (
        <Link to={`/account/${value}`} className={`text-center py-[15px] border border-solid rounded-2xl text-lg font-medium
                                    ${activeTab == value ? "bg-primary text-white" : "bg-white text-primaryDark"}
                                    ${activeTab == value ? "border-[#ddd]" : "border-primary"}
                                    
                                    hover:border-primary hover:bg-primary hover:text-white transition-all duration-300
                                    bg-primary`}>
            {label}
        </Link>
    )


    return (
        <>
            <div className="sm:mt-[130px] mt-12 w-full min-h-screen">
                <div className="lg:w-9/12 md:w-11/12 w-full mx-auto">
                    <div className="w-full flex md:flex-row flex-col gap-x-7">
                        <div className="basis-5/12 w-full px-[15px] my-10">
                            <h3 className="text-4xl my-4 text-primaryDark 
                                ">
                                Hesabım
                            </h3>
                            <div className="flex flex-col w-full gap-2">
                                <>
                                    {renderTabsButtons("Kullanıcı Bilgilerim", AccountTabs.USER_INFO)}
                                    {renderTabsButtons("Siparişlerim", AccountTabs.USER_ORDERS)}
                                    {renderTabsButtons("Ürünlerim", AccountTabs.USER_PRODUCTS)}
                                </>
                            </div>
                        </div>
                        <div className=" w-full">
                            <AnimatePresence>
                                {user && activeTab == AccountTabs.USER_INFO && <UserInformation user={user} />}
                                {user && activeTab == AccountTabs.USER_ORDERS && <UserOrders />}
                                {user && activeTab == AccountTabs.USER_PRODUCTS && <UserProducts />}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account