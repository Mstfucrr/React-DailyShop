import categoryService from "@/services/category/category.service";
import { getProductById, updateProduct } from "@/services/product/product.service";
import { colors, productStatus, sizes } from "@/shared/constants";
import { ICategory, IProduct } from "@/shared/types"
import { productInfoValidationSchema } from "@/shared/validationSchemas";
import { authSelector } from "@/store/auth";
import { SET_TOAST } from "@/store/Toast";
import { IToast } from "@/store/Toast/type";
import { convertCategoriesToTreeSelectModel, findCategoryByKeyInTreeSelectModel } from "@/utils/categoryTreeModel";
import to from "await-to-js";
import { Form, Formik } from 'formik'
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Fieldset } from "primereact/fieldset";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { ProgressSpinner } from "primereact/progressspinner";
import { TreeNode } from "primereact/treenode";
import { TreeSelect, TreeSelectChangeEvent } from "primereact/treeselect";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    productUpdateId: number | null,
    isUpdate: boolean,
    setIsUpdate: (isUpdate: boolean) => void
}

const UpdateProduct = ({ productUpdateId, isUpdate, setIsUpdate }: Props) => {

    const [product, setProduct] = useState<IProduct | null>(null)
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
            setIsUpdate(false)
            return
        }
        setProduct(data.data)
        setProductCoverImage(data.data.image || null)
        setProductImages(data.data.images || [])
    }

    useEffect(() => {
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
        if (typeof image === "string") {
            setProductImages(productImages.filter((img) => img !== image))
            return
        }
        setProductImages(productImages.filter((img) => img !== image))
    }


    const hanldeSubmit = async (values: any) => {
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("price", values.price)
        formData.append("status", values.status)
        formData.append("stock", values.stock)
        formData.append("categoryId", values.category?.id)
        if (productCoverImage != null)
            formData.append("BodyImage", productCoverImage)
        if (productImages != null)
            productImages.forEach((img) => {
                formData.append(typeof img === "string" ? "ProductImages" : "ProductImagesFile", img)
            })
        values.colors?.forEach((color: string) => formData.append("Colors", color))
        values.sizes?.forEach((size : string) => formData.append("Sizes", size))

        formData.forEach((value, key) => {
            console.log(key, value)
        })

        const [err, data] = await to(updateProduct(product?.id as number, formData, token))
        if (err) {
            const toast: IToast = { severity: "error", summary: "Hata", detail: err.message, life: 5000 }
            dispatch(SET_TOAST(toast))
            return
        }
        const toast: IToast = { severity: "success", summary: "Başarılı", detail: data.message, life: 5000 }
        dispatch(SET_TOAST(toast))
        setIsUpdate(false)
        setTimeout(() => {
            window.location.reload()
        }, 2500);



    }

    const [treeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>()
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(undefined);

    const getCategories = async () => {
        const [err, data] = await to(categoryService.fetchCategories())
        if (err) return console.log(err)
        if (data)
            setTreeNodes(convertCategoriesToTreeSelectModel(data))
    }

    useEffect(() => {
        getCategories()
        setSelectedNodeKey(product?.category?.id?.toString())
    }, [])

    useEffect(() => {
        if (treeNodes && selectedNodeKey)
            setSelectedCategory(findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey))
    }, [selectedCategory, selectedNodeKey]);

    return (

        <motion.div className="w-full h-full min-h-[800px] fixed z-10 bg-opacity-10  flex justify-center items-center bg-primaryDark top-0 left-0"
            animate={{
                scale: isUpdate ? 1 : 0,
                opacity: isUpdate ? 1 : 0
            }}
            transition={{
                duration: 0.4
            }}

        >

            <div className="md:w-2/3 w-full md:h-3/4 h-full bg-white rounded-lg shadow-2xl flex flex-col p-5">
                <div className="w-full text-right pr-6 pt-6">
                    <button onClick={() => setIsUpdate(false)} className="text-2xl text-primaryDark">
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
                        <Formik
                            initialValues={product}
                            validationSchema={productInfoValidationSchema}
                            onSubmit={hanldeSubmit}>
                            {({ values, errors, touched, handleChange, handleBlur, handleReset, dirty }) => (
                                <Form className="flex flex-col gap-4 sm:px-4">

                                    {/* Ürün Adı ve Resim */}
                                    <div className="flex flex-col gap-2 ">
                                        <label htmlFor="name">Ürün Adı</label>
                                        <InputText
                                            name="name"
                                            id="name"
                                            className={classNames({ 'p-invalid': errors.name })}
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.name && touched.name &&
                                            <div className="text-red-500">{errors.name}</div>
                                        }

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
                                        <span className="p-float-label">
                                            {values.category != undefined && <>
                                                <TreeSelect id='ts-category' name='ts-category'
                                                    value={selectedNodeKey}
                                                    options={treeNodes}
                                                    onChange={(e: TreeSelectChangeEvent) => {
                                                        handleChange({
                                                            target: {
                                                                name: 'category', value:
                                                                    findCategoryByKeyInTreeSelectModel(treeNodes as TreeNode[], e.value as string)
                                                            }
                                                        })
                                                        setSelectedNodeKey(e.value as string)
                                                    }}
                                                    className={classNames({ 'p-invalid': errors.categoryId })}
                                                />
                                                <label htmlFor="ts-category">
                                                    Bir Kategori Seç
                                                </label>

                                                {touched.categoryId && errors.categoryId &&
                                                    <div className="text-red-500">{errors.categoryId}</div>
                                                }
                                            </>
                                            }


                                        </span>



                                        {/* Fiyat */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="price">Fiyat</label>
                                            <InputNumber
                                                name="price"
                                                id="price"
                                                className={classNames({ 'p-invalid': errors.price })}
                                                value={values.price}
                                                onChange={(e) => { handleChange({ target: { name: 'price', value: e.value } }) }}
                                                onBlur={handleBlur}
                                                mode="currency"
                                                currency="TRY"
                                            />
                                            {errors.price && touched.price &&
                                                <div className="text-red-500">{errors.price}</div>
                                            }
                                        </div>


                                        {/* Bedenler, Renkler, Durum ve stok */}
                                        <div className="flex gap-4 p-5 mt-6">
                                            <div className="flex flex-col">
                                                <label htmlFor="sizes">Bedenler</label>
                                                <MultiSelect
                                                    name="sizes"
                                                    id="sizes" className="w-full"
                                                    value={values.sizes}
                                                    options={sizes}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}

                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="colors">Renkler</label>
                                                <MultiSelect
                                                    name="colors"
                                                    id="colors"
                                                    className={classNames({ 'p-invalid': errors.colors })}
                                                    value={values.colors}
                                                    options={colors}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}

                                                />
                                                {errors.colors && touched.colors &&
                                                    <div className="text-red-500">{errors.colors}</div>
                                                }
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="status">Durum</label>
                                                <Dropdown
                                                    name="status"
                                                    id="status"
                                                    className={classNames({ 'p-invalid': errors.status })}
                                                    value={values.status}
                                                    options={productStatus}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}

                                                />
                                                {errors.status && touched.status &&
                                                    <div className="text-red-500">{errors.status}</div>
                                                }
                                            </div>
                                            {/* stok adeti */}
                                            <div className="flex flex-col">
                                                <label htmlFor="stock">Stok</label>
                                                <InputNumber
                                                    name="stock"
                                                    id="stock"
                                                    className={classNames({ 'p-invalid': errors.stock })}
                                                    value={values.stock}
                                                    onChange={(e) => { handleChange({ target: { name: 'stock', value: e.value } }) }}
                                                    onBlur={handleBlur}

                                                />
                                                {errors.stock && touched.stock &&
                                                    <div className="text-red-500">{errors.stock}</div>
                                                }
                                            </div>
                                        </div>

                                        {/* Açıklama */}
                                        <div className="flex flex-col gap-2">
                                            <Fieldset legend="Açıklama" className="w-full" toggleable>
                                                <Editor
                                                    name="ed-description"
                                                    id="ed-description"
                                                    className={classNames({ 'p-invalid': errors.description })}
                                                    value={values.description}
                                                    onTextChange={(e: EditorTextChangeEvent) => { handleChange({ target: { name: 'description', value: e.htmlValue as any } }) }}
                                                />
                                                {errors.description && touched.description &&
                                                    <div className="text-red-500">{errors.description}</div>
                                                }
                                            </Fieldset>
                                        </div>

                                    </div>

                                    {/* Kaydet ve Sıfırla Butonları */}
                                    <div className="flex gap-3 flex-row">

                                        <Button type="submit" label="Kaydet"
                                            className="w-1/3 self-center"
                                            disabled={!dirty}
                                            onClick={() => hanldeSubmit(values)}
                                        />
                                        <Button
                                            onClick={() => handleReset}
                                            text
                                        >Reset</Button>
                                    </div>

                                </Form>
                            )}
                        </Formik>

                    </div>
                }
            </div>
        </motion.div >
    )
}

export default UpdateProduct