import { IUser, IUserAddress } from "@/services/auth/types"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { user } from "./example.user"
import UserInformation from "./userInformation"
import UserOrders from "./userOrders"

enum AccountTabs {
    USER_INFO,
    USER_ORDERS,
    USER_COMMENTS
}


const Account = () => {
    const [activeTab, setActiveTab] = useState(AccountTabs.USER_INFO)
    

    const [userState, setUserState] = useState<IUser>(user)

    return (
        <>
            <div className="sm:mt-[130px] mt-12 w-full">
                <div className="lg:w-4/6 sm:w-5/6 w-full mx-auto">
                    <div className="w-full flex md:flex-row flex-col gap-x-7">
                        <div className="md:w-1/3 w-full px-[15px] relative my-10">
                            <h3 className="text-4xl my-4 text-primaryDark 
                                ">
                                Hesabım
                            </h3>
                            <div className="flex flex-col w-full">
                                <button className={`relative py-[10px] px-[15px] border border-solid border-[#ddd] rounded-t-2xl text-lg
                                    hover:border-primary hover:bg-primary hover:text-white transition-all duration-300
                                    ${activeTab === AccountTabs.USER_INFO ? 'bg-primary text-white' : 'bg-white text-black'} 
                                    `}
                                    onClick={() => setActiveTab(AccountTabs.USER_INFO)}
                                >
                                    Kullanıcı Bilgilerim
                                </button>

                                <button className={`relative py-[10px] px-[15px] border border-solid border-[#ddd] text-lg
                                    hover:border-primary hover:bg-primary hover:text-white transition-all duration-300
                                    ${activeTab === AccountTabs.USER_ORDERS ? 'bg-primary text-white' : 'bg-white text-black'}
                                    `}
                                    onClick={() => setActiveTab(AccountTabs.USER_ORDERS)}
                                >
                                    Siparişlerim
                                </button>

                                <button className={`relative py-[10px] px-[15px] border border-solid border-[#ddd] rounded-b-2xl text-lg
                                    hover:border-primary hover:bg-primary hover:text-white transition-all duration-300
                                    ${activeTab === AccountTabs.USER_COMMENTS ? 'bg-primary text-white' : 'bg-white text-black'}

                                    `}
                                    onClick={() => setActiveTab(AccountTabs.USER_COMMENTS)}
                                >
                                    Yorumlarım
                                </button>



                            </div>
                        </div>
                        <div className="md:w-2/3 w-full">
                            <AnimatePresence>
                                {activeTab === AccountTabs.USER_INFO && (
                                    <UserInformation user={userState} setUser={setUserState} />
                                )}

                                {activeTab === AccountTabs.USER_ORDERS && (
                                    <UserOrders />
                                )}

                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Account