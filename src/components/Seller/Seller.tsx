import { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"
import ProductInfo from "./ProductInfo"

type Props = {}

const Seller = (props: Props) => {

    const [coverImage, setcoverImage] = useState<File | null>(null)
    const [images, setImages] = useState<File[] | null>([])

    return (
        <>
            <section className="h-auto lg:px-20 px-5 my-10">
                <div className="flex md:flex-row flex-col w-full h-full gap-10 justify-around">
                    {/* cover and another images */}
                    <div className="basis-2/5 h-full w-full flex">
                        <ImageUpload images={images as File[]} setcoverImage={setcoverImage} setImages={setImages as React.Dispatch<React.SetStateAction<File[]>>} />
                    </div>
                    {/* product informations */}
                    <div className="basis-3/5 h-full w-full">
                        <ProductInfo />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Seller