import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { InputText } from 'primereact/inputtext'

enum AccountTabs {
    USER_INFO,
    USER_ORDERS,
    USER_COMMENTS
}


const Account = () => {
    const [activeTab, setActiveTab] = useState(AccountTabs.USER_INFO)

    return (
        <>
            <div className="my-[130px] w-full">
                <div className="w-4/6 mx-auto">
                    <div className="w-full flex md:flex-row flex-col">
                        <div className="md:w-1/3 w-full px-[15px] relative">
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
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full px-[15px] relative"
                                    >
                                        <h3 className="text-4xl my-4 text-primaryDark
                                            ">
                                            Kullanıcı Bilgilerim
                                        </h3>
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-col md:flex-row w-full">
                                                <div className="md:w-1/2 w-full">
                                                    <label className="text-lg text-primaryDark font-semibold mb-2">
                                                        Adınız
                                                    </label>
                                                  

                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
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