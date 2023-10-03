import { IUser } from "@/services/auth/types"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { userEx } from "./example.user"
import UserInformation from "./userInformation"

enum AccountTabs {
    USER_INFO,
    USER_ORDERS,
    USER_COMMENTS
}


const Account = () => {
    const [activeTab, setActiveTab] = useState(AccountTabs.USER_INFO)


    const [user, setUser] = useState<IUser>(userEx)

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
                                <button className={`relative py-[10px] px-[15px] border border-solid border-[#ddd] rounded-2xl text-lg
                                    hover:border-primary hover:bg-primary hover:text-white transition-all duration-300
                                    ${activeTab === AccountTabs.USER_INFO ? 'bg-primary text-white' : 'bg-white text-black'} 
                                    `}
                                    onClick={() => setActiveTab(AccountTabs.USER_INFO)}
                                >
                                    Kullanıcı Bilgilerim
                                </button>
                            </div>
                        </div>
                        <div className="md:w-2/3 w-full">
                            <AnimatePresence>
                                <UserInformation user={user} setUser={setUser} />
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Account