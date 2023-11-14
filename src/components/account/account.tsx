import { IUser } from "@/services/auth/types"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import UserInformation from "./userInformation"
import { useSelector } from "react-redux"
import { authSelector } from "@/store/auth"


const Account = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const { auth } = useSelector(authSelector)

    useEffect(() => {
        if (auth)
            setUser(auth)
    }, [])

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
                                <button className="relative py-[10px] px-[15px] border border-solid border-[#ddd] rounded-2xl text-lg
                                    hover:border-primary hover:bg-primary hover:text-white transition-all duration-300
                                    bg-primary text-white">
                                    Kullanıcı Bilgilerim
                                </button>
                            </div>
                        </div>
                        <div className="md:w-2/3 w-full">
                            <AnimatePresence>
                                {user && <UserInformation user={user} setUser={setUser} />}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Account