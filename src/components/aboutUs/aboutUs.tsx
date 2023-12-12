import { getAbout } from "@/services/about/about"
import to from "await-to-js"
import { Messages } from "primereact/messages"
import { ProgressSpinner } from "primereact/progressspinner"
import { useCallback, useEffect, useRef, useState } from "react"

const AboutUs = () => {

    const [about, setAbout] = useState<string | null>(null)
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

    useEffect(() => {
        fetchAbout()
    }, [])

    const renderAbout = useCallback(() => {
        return (
            about ?
                <div className="flex lg:w-2/3 w-full flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center my-10">
                        <p dangerouslySetInnerHTML={{ __html: about }} />
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