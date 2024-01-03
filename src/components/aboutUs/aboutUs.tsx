import { getAbout } from "@/services/about/about"
import { getContact } from "@/services/contact/contact"
import to from "await-to-js"
import { Messages } from "primereact/messages"
import { ProgressSpinner } from "primereact/progressspinner"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaLocationArrow, FaPhone } from "react-icons/fa"
import { MdMail } from "react-icons/md"

const AboutUs = () => {

    const [about, setAbout] = useState<string | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [phone, setPhone] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const msgs = useRef<Messages>(null)


    const fetchAbout = async () => {
        setLoading(true)
        const [err, data] = await to(getAbout())
        if (err) {
            msgs.current?.show({ severity: 'error', summary: "Hata", detail: err.message, life: 3000 })
            return setLoading(false)
        }
        setAbout(data.data)
        setLoading(false)
    }

    const fetchContact = async () => {
        setLoading(true)
        const [err, data] = await to(getContact())
        console.log("contact", data)
        if (err) {
            msgs.current?.show({ severity: 'error', summary: "Hata", detail: err.message, life: 3000 })
            return setLoading(false)
        }
        if (!data.data) return
        setAddress(data.data.address)
        setPhone(data.data.phone)
        setEmail(data.data.email)
        setLoading(false)
    }

    useEffect(() => {
        fetchAbout()
        fetchContact()
    }, [])

    const renderAbout = useCallback(() => {
        return (
            about ?
                <div className="flex lg:w-2/3 w-full flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center my-10">
                        <div className="flex gap-7 items-center my-10 ">
                            <div className="w-11 bg-black h-1" />

                            <h2 className="text-4xl font-bold text-gray-800 text-center">
                                <span className="px-20">Hakkımızda</span>
                            </h2>
                            <div className="w-11 bg-black h-1" />
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: about }} />
                    </div>
                    {/* iletişim */}
                    <div className="flex flex-col justify-center items-center my-10">
                        <div className="flex gap-7 items-center ">
                            <div className="w-11 bg-black h-1" />

                            <h2 className="text-4xl font-bold text-gray-800 text-center">
                                <span className="px-20">İletişim</span>
                            </h2>
                            <div className="w-11 bg-black h-1" />
                        </div>

                        <div className="flex flex-col justify-center items-center my-10">
                            <div className="flex flex-col justify-center my-10 gap-9">
                                <span className="text-lg font-bold text-gray-800 text-center">
                                    Adres
                                </span>
                                <div className="flex gap-4">

                                    <FaLocationArrow className="text-2xl" />

                                    <p>{address}</p>
                                </div>


                                <span className="text-lg font-bold text-gray-800 text-center">
                                    Telefon
                                </span>
                                <div className="flex gap-4">

                                    <FaPhone className="text-2xl" />

                                    <p>{phone}</p>

                                    <a href={`tel:${phone}`} className="text-primary">
                                        Aramak için tıklayın

                                    </a>
                                </div>

                                <span className="text-lg font-bold text-gray-800 text-center">
                                    Email
                                </span>
                                <div className="flex gap-4">

                                    <MdMail className="text-2xl" />

                                    <p>{email}</p>

                                    <a href={`mailto:${email}`} className="text-primary">
                                        Mail atmak için tıklayın
                                    </a>

                                </div>



                            </div>

                        </div>
                    </div>


                </div>
                : <Messages ref={msgs} className="lg:w-2/3 w-full mx-auto" />
        )

    }, [about])



    return (
        <>
            {loading
                ? <div className="w-full flex justify-start"><ProgressSpinner /></div>
                : renderAbout()
            }

        </>
    )
}

export default AboutUs