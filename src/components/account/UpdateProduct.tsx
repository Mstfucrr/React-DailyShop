import { getProductById } from "@/services/product/product.service";
import { colors, sizes } from "@/shared/sizes_and_colors";
import { IProduct } from "@/shared/types"
import { authSelector } from "@/store/auth";
import { SET_TOAST } from "@/store/Toast";
import { IToast } from "@/store/Toast/type";
import to from "await-to-js";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { Fieldset } from "primereact/fieldset";
import { MultiSelect } from "primereact/multiselect";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    productUpdateId: number | null,
    setUpdateProductId: (productUpdateId: number | null) => void
}

const UpdateProduct = ({ productUpdateId, setUpdateProductId }: Props) => {

    const [product, setProduct] = useState<IProduct | null>(null)
    // düzenleme ekranı açık mı?
    const [updateScreen, setUpdateScreen] = useState<boolean>(false)
    const [productCoverImage, setProductCoverImage] = useState<File | null>(null)
    const [productImages, setProductImages] = useState<any[]>([])

    const dispatch = useDispatch()


    const { token } = useSelector(authSelector)
    const fetchProduct = async () => {

        if (productUpdateId == null) return setProduct(null)
        const [err, data] = await to(getProductById(productUpdateId, token))
        if (err) {
            const toast: IToast = { severity: "error", summary: "Hata", detail: err.message, life: 5000 }
            dispatch(SET_TOAST(toast))
            setProduct(null)
            setUpdateProductId(null)
            setUpdateScreen(false)
            return
        }
        setProduct(data.data)
        setProductCoverImage(data.data.image || null)
        console.log("data.data", data.data.images || [])
        setProductImages(data.data.images || [])
        console.log("data.data", data.data)
    }

    useEffect(() => {
        setUpdateScreen(productUpdateId != null)
        setProduct(null)
        fetchProduct()
    }, [productUpdateId])

    const handleCoverImage = (e: any) => {
        if (e.target.files == null) return
        setProductCoverImage(e.target.files[0])
    }

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) return
        if (e.target.files.length === 0) return
        // aynı dosya varsa hata ver
        for (const file of e.target.files) {
            if (productImages.find((img) => img.name === file.name)) {
                const toast: IToast = { severity: "warn", summary: "Uyarı", detail: "Aynı dosyadan var", life: 5000 }
                dispatch(SET_TOAST(toast))
                return
            }
        }
        const files = Array.from(e.target.files)
        setProductImages([...productImages, ...files])
    }

    const handleRemoveImage = (image: File | string) => {
        console.log("image", image)
        if (typeof image === "string") {
            setProductImages(productImages.filter((img) => img !== image))
            return
        }
        setProductImages(productImages.filter((img) => img !== image))
        console.log("productImages", productImages)
    }




    return (

        <motion.div className="w-full h-full min-h-[800px] fixed z-10 bg-opacity-10  flex justify-center items-center bg-primaryDark top-0 left-0"
            animate={{
                scale: !updateScreen ? 0 : 1,
                opacity: !updateScreen ? 0 : 1
            }}
            transition={{
                duration: 0.4
            }}

        >

            <div className="md:w-2/3 w-full md:h-3/4 h-full bg-white rounded-lg shadow-2xl flex flex-col p-5">
                <div className="w-full text-right pr-6 pt-6">
                    <button onClick={() => setUpdateProductId(null)} className="text-2xl text-primaryDark">
                        <FaTimes />
                    </button>
                </div>
                {product == null && <ProgressSpinner className="!w-full text-center" />}
                {product != null &&
                    <div className="w-full h-full overflow-y-auto flex flex-col">

                        <div className="text-center">
                            <h3 className="text-4xl my-4 text-primaryDark">
                                Ürün Düzenle - {product?.name}
                            </h3>
                        </div>

                        {/* Ürün Adı ve Resim */}
                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="name">Ürün Adı</label>
                            <input type="text" name="name" id="name" className="border rounded-lg p-2"
                                defaultValue={product?.name}
                            />
                            <Fieldset legend="Ürün Resmleri" className="w-full" toggleable>
                                <>
                                    {productCoverImage != null &&
                                        <div className="relative flex justify-center">
                                            <img src={typeof productCoverImage == "string" ? productCoverImage : URL.createObjectURL(productCoverImage)} alt={productCoverImage as any} className="w-[350px] h-auto object-contain" />
                                            <div className="absolute top-2/3 bg-white bg-opacity-60 rounded-full
                                            hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-110
                                            hover:border hover:border-green-500 border-dashed
                                        ">
                                                <Button icon="pi pi-upload" severity="success" rounded text={true}
                                                    className="w-full h-full"
                                                    onClick={() => {
                                                        const input = document.createElement("input")
                                                        input.type = "file"
                                                        input.accept = "image/*"
                                                        input.onchange = handleCoverImage
                                                        input.click()
                                                    }}>
                                                    <div className="px-5">
                                                        Resim Değiştir
                                                    </div>
                                                </Button>

                                            </div>
                                        </div>
                                    }

                                    {productImages != null &&
                                        <div className="flex flex-row gap-4 w-full flex-wrap mt-3">
                                            {productImages.map((image) => (
                                                <div className="flex relative justify-end w-[300px] h-auto rounded-3xl border-dashed border border-blue-600"
                                                    key={typeof image == "string" ? image : image.name}>
                                                    <FaTimes className="text-red-400 text-2xl cursor-pointer absolute float-right right-3 top-3"
                                                        onClick={() => {
                                                            handleRemoveImage(image)
                                                        }}
                                                    />
                                                    <img src={typeof image == "string" ? image : URL.createObjectURL(image)} alt="resim" className=" object-contain p-2 " />
                                                </div>
                                            ))}

                                            <button className="w-[300px] text-2xl text-blue-600 h-auto border border-blue-600 border-dashed rounded-3xl
                                                hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 bg-opacity-10" onClick={() => {
                                                    const input = document.createElement("input")
                                                    input.type = "file"
                                                    input.accept = "image/*"
                                                    input.multiple = true
                                                    input.click()
                                                    input.onchange = (e) => { handleAddImage(e as any) }
                                                }}>
                                                +
                                            </button>


                                        </div>
                                    }
                                </>
                            </Fieldset>

                        </div>
                        <div className="flex flex-col gap-4 md:w-5/6 w-full p-4">
                            {/* Fiyat */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="price">Fiyat</label>
                                <input type="number" name="price" id="price" className="border rounded-lg p-2"
                                    defaultValue={product?.price}
                                />
                            </div>
                            {/* Stok */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stock">Stok</label>
                                <input type="number" name="stock" id="stock" className="border rounded-lg p-2"
                                    defaultValue={product?.stock}
                                />
                            </div>
                            {/* Açıklama */}
                            <div className="flex flex-col gap-2">
                                <Fieldset legend="Açıklama" className="w-full" toggleable>
                                    <Editor id="description" className=""
                                        value={product?.description}
                                    />
                                </Fieldset>
                            </div>

                            {/* Bedenler ve Renkler */}
                            <div className="flex gap-4 p-5 mt-6">
                                <div className="flex flex-col">
                                    <label htmlFor="sizes">Bedenler</label>
                                    <MultiSelect id="sizes" className="w-full"
                                        value={product?.sizes}
                                        options={sizes}
                                        onChange={(e) => {
                                            setProduct({
                                                ...product,
                                                sizes: e.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="colors">Renkler</label>
                                    <MultiSelect id="colors" className="w-full"
                                        value={product?.colors}
                                        options={colors}
                                        onChange={(e) => {
                                            setProduct({
                                                ...product,
                                                colors: e.value
                                            })
                                        }}
                                    />

                                </div>
                            </div>



                        </div>


                    </div>
                }
            </div>
        </motion.div >
    )
}

export default UpdateProduct