import { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"

type Props = {}

const Seller = (props: Props) => {

    const [coverImage, setcoverImage] = useState<File | null>(null)
    const [images, setImages] = useState<File[] | null>([])

    useEffect(() => {
        
        console.log("coverImage", coverImage)
    }, [coverImage])

    useEffect(() => {
        console.log("images: " , images)
    },[images])

    return (
        <>
            <section className="h-auto lg:px-20 px-5 my-10">
                <div className="flex md:flex-row flex-col w-full h-full gap-10 justify-around">
                    <div className="basis-2/5 h-full w-full flex">
                        <ImageUpload images={images as File[]} setcoverImage={setcoverImage} setImages={setImages as React.Dispatch<React.SetStateAction<File[]>>} />
                    </div>
                    <div className="bg-blue-100 basis-3/5 h-full w-full">

                    </div>
                </div>
            </section>
        </>
    )
}

export default Seller