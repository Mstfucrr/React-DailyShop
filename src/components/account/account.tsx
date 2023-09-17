import { IUser, IUserAddress } from "@/services/auth/types"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import UserInformation from "./userInformation"
import UserOrders from "./userOrders"

enum AccountTabs {
    USER_INFO,
    USER_ORDERS,
    USER_COMMENTS
}


const Account = () => {
    const [activeTab, setActiveTab] = useState(AccountTabs.USER_INFO)
    const user: IUser = {
        id: 1,
        name: 'Mehmet',
        surname: 'Kaya',
        email: 'mhmtky123@gmail.com',
        phone: '532 123 45 67',
        profileImage: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1694862140~exp=1694862740~hmac=3367954bc36e90d64d76202dced34ed4e2f575ca512ef8a182b2e0a6fa185212',
        addresses : [
            {
                id: 1,
                title: 'Ev',
                address: 'İstanbul / Kadıköy',
                description: 'Ev adresi',
                isMain: true,
                city: 'İstanbul',
            },
            {
                id : 2,
                title: 'İş',
                description: 'İş adresi',
                isMain: false,
                city: 'Ankara',
                address: 'Ankara / Çankaya / Kızılay'

            }
        ] as IUserAddress[],
        role : "User",
        createdAt : "2021-09-01T00:00:00.000Z",
        updatedAt : "2023-09-01T00:00:00.000Z",
        
    }

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