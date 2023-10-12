import { IUser } from "@/services/auth/types"
import { IToast } from "@/store/Toast/type"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { userEx } from "./example.user"
import UserInformation from "./userInformation"
import { Messages } from 'primereact/messages';
import { useSelector } from "react-redux"
import { authSelector } from "@/store/auth"


const Account = () => {


    const [user, setUser] = useState<IUser | null>(null)
    const msgs = useRef<Messages>(null);
    const { auth, token , isAuthorized } = useSelector(authSelector)

    useEffect(() => {
        if (isAuthorized)
            setUser(auth)
        else {
            msgs.current?.clear()
            msgs.current?.show({
                severity: 'error',
                summary: 'Hata',
                detail : 'Kullanıcı bilgileri alınamadı',
                closable: false,
                sticky: true
            });
        }
        console.log(auth)
    }, [])

    useEffect(() => {

        

    },[user])

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
                                {isAuthorized && user 
                                    ? <UserInformation user={user} setUser={setUser} />
                                    : <Messages ref={msgs} />
                                }
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Account