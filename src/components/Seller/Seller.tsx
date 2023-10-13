import { addProduct } from "@/services/product/product.service"
import { IProductRequest, IProductResponse } from "@/services/product/types"
import { authSelector } from "@/store/auth"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import to from "await-to-js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import ProductInfo from "./ProductInfo"


const Seller = () => {

    const [coverImage, setcoverImage] = useState<File | null>(null)
    const [images, setImages] = useState<File[] | null>([])

    const { isAuthorized , token } = useSelector(authSelector)
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
        if (!isAuthorized) {
            const toast: IToast = { severity: "error", summary: "Hata", detail: "Bu sayfaya erişim yetkiniz bulunmamaktadır.", life: 3000 } // service çalışmadı
            dispatch(SET_TOAST(toast))
            navigate("/login")
            return 
        }
        if (coverImage !== null && images?.length !== 0 && images && productInfo.name.length > 2) {
            const addData = async () => {
                const input: IProductRequest = {
                    data: {
                        ...productInfo, image: coverImage, images: images
                    },
                }
                const [err, data] = await to(addProduct(input,token))
                if (err) {
                    const toast: IToast = { severity: "error", summary: "Sistematik Hata", detail: err.message, life: 3000 } // service çalışmadı 
                    dispatch(SET_TOAST(toast))
                    return
                }

                const toast: IToast = {
                    severity: data?.status === 200 ? "success" : "error",
                    summary: data?.status === 200 ? "Başarılı" : "Hata",
                    detail: data?.message,
                    life: 3000
                }
                dispatch(SET_TOAST(toast))
                // if (data?.status === 200)
                //     navigate("/productDetail/" + data?.data?.id)


            }

            addData()
        }
        else {
            const toast: IToast = { severity: "info", summary: "Hata", detail: "Lütfen tüm alanları doldurduğunuzdan emin olun.", life: 3000 } // service çalışmadı 
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