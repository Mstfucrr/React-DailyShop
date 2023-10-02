import { addProduct } from "@/services/product/product.service"
import { IProductRequest, IProductResponse } from "@/services/product/types"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import ProductInfo from "./ProductInfo"


const Seller = () => {

    const [coverImage, setcoverImage] = useState<File | null>(null)
    const [images, setImages] = useState<File[] | null>([])

    const [productInfo, setProductInfo] = useState({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        status: "",
        categoryId: 0,
        colors: [] as string[],
        sizes: [] as string[] | undefined,
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {

        if (coverImage !== null && images?.length !== 0 && images) {
            const input: IProductRequest = {
                data: {
                    ...productInfo, image: coverImage, images: images
                },
            }
            addProduct(input).then((res: IProductResponse) => {

                const toast: IToast = {
                    severity: res.status === 200 ? "success" : "error",
                    summary: res.status === 200 ? "Başarılı" : "Hata",
                    detail: res.message,
                    life: 3000
                }
                dispatch(SET_TOAST(toast))
                if (res.status === 200)
                    navigate("/productDetail/" + res.data?.id)


            }).catch((err: any) => {
                const toast: IToast = { severity: "error", summary: "Sistematik Hata", detail: err.message, life: 3000 } // service çalışmadı 
                dispatch(SET_TOAST(toast))
            })
        }
        else if (productInfo.name.length > 2) {
            const toast: IToast = { severity: "error", summary: "Hata", detail: "Lütfen resim ekleyiniz ve yüklemeyi unutmayınız", life: 3000 }
            dispatch(SET_TOAST(toast))
        }



    }, [productInfo])


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
                        <ProductInfo setProductInfo={setProductInfo as any} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Seller