import { addProduct } from "@/services/product/product.service"
import { IProductInfo } from "@/services/product/types"
import { authSelector } from "@/store/auth"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import to from "await-to-js"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import ProductInfo from "./ProductInfo"
import * as Yup from 'yup'
import { ProgressSpinner } from "primereact/progressspinner"
import { Button } from "primereact/button"

const Seller = () => {

    const [coverImage, setcoverImage] = useState<File | null>(null)
    const [images, setImages] = useState<File[] | null>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isProductAdded, setProductAdded] = useState<boolean | undefined>(undefined);
    const { isAuthorized, token } = useSelector(authSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [productInfo, setProductInfo] = useState<IProductInfo>({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        status: "",
        categoryId: 0 as number,
        colors: [] as string[] | undefined,
        sizes: [] as string[] | undefined,
    })

    useEffect(() => {
        if (!isAuthorized) {
            const toast: IToast = { severity: "warn", summary: "Uyarı", detail: "Bu sayfaya erişim yetkiniz bulunmamaktadır.", life: 3000 } // service çalışmadı
            dispatch(SET_TOAST(toast))
            navigate("/login")
            return
        }
    }, [])

    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Ürün adı gereklidir')
            .min(3, 'Ürün adı çok kısa')
            .max(50, 'Ürün adı çok uzun'),
        price: Yup.number()
            .required('Fiyat gereklidir')
            .min(2, 'Fiyat 2 dan küçük olamaz'),
        stock: Yup.number()
            .required('Stok gereklidir')
            .min(0, 'Stok 0 dan küçük olamaz'),
        description: Yup.string()
            .required('Açıklama gereklidir')
            .min(40, 'Açıklama çok kısa')
            .max(1000, 'Açıklama çok uzun'),
        status: Yup.string()
            .required('Durum gereklidir'),
        colors: Yup.array()
            .min(1, 'En az bir renk seçiniz'),
        category: Yup.string()
            .required('Kategori seçiniz'),
    })

    const formik = useFormik({
        initialValues: {
            productName: '',
            price: 0,
            stock: 0,
            description: '',
            status: '',
            category: '',
            colors: [],
        },
        validationSchema: validationSchema,
        onSubmit: async () => {
            setLoading(true)

            await handleAddProduct().then(() => setLoading(false))
            // setTimeout(() => {
            //     setLoading(false)
            // }, 3000);
        }
    })


    const handleAddProduct = async () => {

        if (coverImage !== null && images && images?.length !== 0) {
            const formData = new FormData();

            Object.entries(productInfo).forEach(([key, value]) => {
                if (key === "colors" || key === "sizes") return
                formData.append(key, value)
            })
            productInfo.colors?.forEach((color) => formData.append("Colors", color))
            productInfo.sizes?.forEach((size) => formData.append("Sizes", size))
            formData.append("BodyImage", coverImage, coverImage.name)
            images.map(async (image) => {
                formData.append(`ProductImages`, image, image.name)
            })
            const [err, res] = await to(addProduct(formData, token))
            if (err) {
                const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 } // service çalışmadı 
                dispatch(SET_TOAST(toast))
                return
            }
            const toast: IToast = { severity: "success", summary: "Başarılı", detail: res?.message, life: 3000 }
            dispatch(SET_TOAST(toast))
        }
        else {
            console.log(coverImage, " \n", images, " \n", productInfo.name)
            const toast: IToast = { severity: "info", summary: "Uyarı", detail: "Lütfen tüm alanları doldurduğunuzdan emin olun.", life: 3000 } // service çalışmadı 
            dispatch(SET_TOAST(toast))
        }

    }

    const LoadingTemplete = () => {
        // tüm sayfayı kapsayacak şekilde spinner göster
        return (
            <div className="w-screen h-screen fixed top-0 left-0 flex flex-col gap-4 justify-center items-center bg-opacity-50 bg-black z-50">

                {/* ürün eklendi mi  */}
                {isProductAdded !== undefined ?
                    isProductAdded === true ?
                        // ürün eklendiyse
                        <div className=""></div>
                        :
                        // ürün eklenmediyse
                        <div className="">asd</div>
                    :
                    <>
                        <ProgressSpinner className="!w-24" strokeWidth="5" animationDuration=".8s" fill="white" />
                        <span className="animate-bounce font-bold tracking-wider text-5xl text-primaryDark absolute bottom-1/2"> D </span>
                        <Button severity="warning" label="İptal et" className="w-1/5 !text-xl" onClick={() => setLoading(false)} />
                    </>
                }
            </div>
        )
    }

    return (
        <>

            <section className="h-auto lg:px-20 px-5 my-10">
                {loading && LoadingTemplete()}
                <div className="flex md:flex-row flex-col w-full h-full gap-10 justify-around">
                    {/* cover and another images */}
                    <div className="basis-2/5 h-full w-full flex">
                        <ImageUpload setcoverImage={setcoverImage} setImages={setImages as React.Dispatch<React.SetStateAction<File[]>>} />
                    </div>
                    {/* product informations */}
                    <div className="basis-3/5 h-full w-full">
                        <ProductInfo formik={formik} setProductInfo={setProductInfo as any} productInfo={productInfo} />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Seller