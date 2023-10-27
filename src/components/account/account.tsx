import { IUser } from "@/services/auth/types"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import UserInformation from "./userInformation"
import { Messages } from 'primereact/messages';
import { useSelector } from "react-redux"
import { authSelector } from "@/store/auth"
import { Link } from "react-router-dom"


const Account = () => {


    const [user, setUser] = useState<IUser | null>(null)
    const msgs = useRef<Messages>(null);
    const { auth, isAuthorized } = useSelector(authSelector)

    useEffect(() => {
        if (isAuthorized && auth) {
            setUser(auth)
        }
        else {
            msgs.current?.clear()
            msgs.current?.show({
                severity: 'error',
                summary: 'Hata',
                detail: <>
                    <div className="flex gap-6 text-lg">
                        <p className="">
                            Lütfen giriş yapın.
                        </p>
                        <Link to={"/login"} className="text-black underline">Giriş Yap</Link> veya <Link to={"/register"} className="text-black underline">Kayıt Ol</Link>
                    </div>

                </>,
                closable: false,
                sticky: true
            });
        }
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