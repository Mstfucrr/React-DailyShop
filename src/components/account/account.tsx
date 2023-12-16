import { IUser } from "@/services/auth/types"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import UserInformation from "./userSettings/userInformation"
import { useDispatch, useSelector } from "react-redux"
import { SET_AUTH, authSelector } from "@/store/auth"
import UserProducts from "./userProducts/userProducts"
import UserOrders from "./userOrders/userOrders"
import { Link, useParams } from "react-router-dom"
import to from "await-to-js"
import { authService } from "@/services/auth/auth.service"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import { ProgressSpinner } from "primereact/progressspinner"


const Account = () => {

    const { tab } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    enum AccountTabs {
        USER_INFO = "Kullanıcı Bilgilerim",
        USER_ORDERS = "Siparişlerim",
        USER_PRODUCTS = "Ürünlerim"
    }
    const [activeTab, setActiveTab] = useState<AccountTabs>(AccountTabs.USER_INFO)

    const [user, setUser] = useState<IUser | null>(null)
    const { isAuthorized, token } = useSelector(authSelector)
    const dispatch = useDispatch()

    const fetchUser = async () => {
        setLoading(true)
        const [err, data] = await to(authService.getAccount(token))
        if (err) {
            setLoading(false)
            const toast: IToast = { severity: "error", summary: "Hata", detail: err.message, life: 5000 }
            dispatch(SET_TOAST(toast))
            return
        }
        setUser(data.data)
        dispatch(
            SET_AUTH({
                user: data.data,
                token: token,
            })
        )
        setLoading(false)

    }

    useEffect(() => {
        if (isAuthorized)
            fetchUser()
        else {
            const toast: IToast = { severity: "error", summary: "Hata", detail: "Giriş yapmalısınız", life: 5000 }
            dispatch(SET_TOAST(toast))
        }

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
        <div className="sm:mt-[130px] mt-12 w-full min-h-screen">
            <div className="lg:w-9/12 md:w-11/12 w-full mx-auto">
                <div className="w-full flex md:flex-row flex-col gap-x-7">
                    <div className="basis-5/12 w-full px-[15px] my-10">
                        <h3 className="text-4xl my-4 text-primaryDark 
                                ">
                            Hesabım
                        </h3>
                        <div className="flex flex-col w-full gap-2">
                            {renderTabsButtons("Kullanıcı Bilgilerim", AccountTabs.USER_INFO)}
                            {renderTabsButtons("Siparişlerim", AccountTabs.USER_ORDERS)}
                            {renderTabsButtons("Ürünlerim", AccountTabs.USER_PRODUCTS)}
                        </div>
                    </div>
                    <div className=" w-full">
                        <AnimatePresence>
                            {loading && <div className="w-full h-full flex items-center justify-center">
                                <ProgressSpinner />
                            </div>}
                            {!loading && user && activeTab == AccountTabs.USER_INFO && <UserInformation user={user} />}
                            {!loading && user && activeTab == AccountTabs.USER_ORDERS && <UserOrders />}
                            {!loading && user && activeTab == AccountTabs.USER_PRODUCTS && <UserProducts />}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account