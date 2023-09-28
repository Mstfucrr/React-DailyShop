import { IProduct } from "@/shared/types"
import { Galleria } from 'primereact/galleria';
import { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { RadioButton } from "primereact/radiobutton";
import { FaCommentAlt, FaInfoCircle, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { TabView, TabPanel } from 'primereact/tabview';
import { Avatar } from 'primereact/avatar';
import { IReviews } from "@/shared/types";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { emailRegex } from "@/helper/regex";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

type Props = {
    product: IProduct
}

const ProductDetail = ({ product }: Props) => {
    const [images, setImages] = useState(null);


    useEffect(() => {
        setImages(product.images?.map((image) => ({ source: image })) as any);
        console.log(images)
    }, [])

    const itemTemplate = (item: any) => {
        return (
            <img src={item.source} alt={item.alt} style={{ width: '100%', display: 'block' }} />
        );
    }

    const thumbnailTemplate = (item: any) => {
        return (
            <img src={item.source} alt={item.alt} style={{ display: 'block', width: "auto", height: 90, objectFit: "cover" }} />
        );
    }

    const [selectSize, setSelectSize] = useState<string | undefined>(undefined)
    const [selectColor, setSelectColor] = useState<string | undefined>(undefined)

    // const size = [{ name: "S", key: "s" }]
    const sizes = product.sizes?.map((size) => ({ name: size, key: size })) as any

    const colors = product.colors?.map((color) => ({ name: color, key: color })) as any

    const [quantity, setQuantity] = useState(1)

    const [rating, setRating] = useState(0)

    // validate for review
    const validationSchema = Yup.object().shape({
        review: Yup.string()
            .required('Yorum alanı boş bırakılamaz')
            .max(500, 'Yorumunuz çok uzun')
            .min(4, 'Yorumunuz çok kısa'),

        name: Yup.string()
            .required('İsim alanı boş bırakılamaz')
            .max(50, 'İsim çok uzun')
            .min(2, 'İsim çok kısa'),

        email: Yup.string()
            .email('Email geçersiz')
            .required('Email alanı boş bırakılamaz')
            .max(50, 'Email çok uzun')
            .min(2, 'Email çok kısa')
            .matches(emailRegex(), 'Email geçersiz'),

        rating: Yup.number()
            .min(1, "Rating alanı boş bırakılamaz"),

    })

    const formik = useFormik({
        initialValues: {
            review: '',
            name: '',
            email: '',
            rating: 0
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })


    return (product &&

        <>
            <div className="lg:px-20">
                {/* image and info */}
                <div className="flex md:flex-row flex-col gap-y-5 justify-around mt-24">
                    <div className="w-full basis-2/5">
                        {images &&
                            <Galleria numVisible={4} className="w-full border border-solid"
                                item={itemTemplate} value={images}
                                thumbnail={thumbnailTemplate}
                            />
                        }
                    </div>
                    <div className="basis-3/5 flex flex-col px-10">
                        {/* name */}
                        <h2 className="font-semibold text-3xl text-black mb-2">
                            {product.name}
                        </h2>
                        {/* rating */}
                        <div className="flex flex-row gap-x-4 my-2">
                            <Rating value={product.rating} readOnly cancel={false} pt={{
                                onIcon: { className: '!text-primary' }
                            }} />
                            ( {product.reviews} Reviews )
                        </div>
                        {/* price */}
                        <h2 className="font-semibold text-3xl text-black my-2">
                            {product.price}.00₺
                        </h2>
                        {/* description */}
                        <p className="leading-6 my-4">
                            {product.description.substring(0, 300) + "..."}
                        </p>
                        {/* sizes */}
                        <div className="flex flex-row flex-wrap gap-x-5 items-center">
                            <h2 className="text-lg font-semibold">
                                Beden :
                            </h2>
                            {sizes && sizes.map((size: any, index: number) => (

                                <div className="flex align-items-center" key={index}>
                                    <RadioButton inputId={`size-${size.name}`} name="size" value={size} onChange={(e) => setSelectSize(e.value.name as string)} checked={selectSize === size.name} />
                                    <label htmlFor={size.key} className="ml-2">{size.name}</label>
                                </div>
                            ))
                            }
                        </div>
                        {/* colors */}
                        <div className="flex flex-row flex-wrap gap-x-5 items-center mt-3">

                            <h2 className="text-lg font-semibold">
                                Renkler :
                            </h2>
                            {colors && colors.map((color: any, index: number) => (
                                <div className="flex align-items-center" key={index}>

                                    <RadioButton inputId={`color-${color.name}`} name="color" value={color} onChange={(e) => setSelectColor(e.value.name as string)} checked={selectColor === color.name} />
                                    <label htmlFor={color.key} className="ml-2" style={{ color: color.name }}>{color.name}</label>
                                </div>
                            ))
                            }

                        </div>
                        <div className="flex flex-wrap items-center mt-5 gap-x-6">

                            <div className="relative flex flex-nowrap max-w-[130px]">
                                <div>
                                    <button className='inline-block bg-primary text-[#212529] border-primary py-3 px-3 leading-6 hover:text-white hover:bg-primaryDark transition-all duration-300 ease-in-out'
                                        onClick={() => setQuantity(quantity - 1)}
                                        disabled={quantity === 1}

                                    >
                                        <FaMinus className='' />
                                    </button>
                                </div>

                                <input type="text" className='relative w-[3%] flex-[1_1_auto] text-center bg-secondary py-1 px-2 outline-none text-sm'
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    min={1}

                                />
                                <div>
                                    <button className='inline-block bg-primary text-[#212529] border-primary py-3 px-3 leading-6 hover:text-white hover:bg-primaryDark transition-all duration-300 ease-in-out'
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <FaPlus className='' />
                                    </button>
                                </div>
                            </div>

                            <div className="">
                                <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-3 leading-6 hover:text-white hover:bg-primaryDark transition-all duration-300 ease-in-out'>
                                    <FaShoppingCart className="inline mr-3" />
                                    Sepete Ekle
                                </button>
                            </div>

                        </div>


                    </div>
                </div>

                {/* Description Information Reviews */}
                <div className="row">
                    <div className="card mt-8">
                        <TabView className="flex flex-col items-center"
                            panelContainerClassName="w-full !p-0"
                        >
                            <TabPanel header={
                                <div className="text-primary">
                                    <MdDescription className="inline mr-2" />
                                    Tanım
                                </div>
                            }>
                                <p className="mt-5 px-2">{product.description}</p>
                            </TabPanel>
                            <TabPanel header={
                                <div className="text-primary">
                                    <FaInfoCircle className="inline mr-2" />
                                    Bilgi
                                </div>
                            }>
                                <div className="flex flex-col px-4 mt-2">
                                    <p className="">
                                        <span className="font-semibold">Ürün Durumu : </span> {product.information?.status}
                                    </p>
                                    <p className="">
                                        <span className="font-semibold">Ürün Stok Durumu : </span> {product.information?.stock}
                                    </p>
                                </div>

                            </TabPanel>
                            <TabPanel header={
                                <div className="text-primary">
                                    <FaCommentAlt className="inline mr-2" />
                                    Yorumlar

                                </div>
                            }
                            >
                                <div className="flex flex-col lg:flex-row w-full px-5 gap-x-3 gap-y-4 mt-6">
                                    <div className="w-full flex flex-col">
                                        <h1 className="text-3xl">
                                            "{product.name}" için {product.reviewsData.length} Yorum
                                        </h1>
                                        <div className="flex flex-col w-full">
                                            {product.reviewsData.map((review: IReviews) => (
                                                <div className="flex items-start mx-4 my-2">
                                                    <Avatar image={review.avatar} size={"large"}
                                                        className="m-2"
                                                    />
                                                    <div className="flex-1">
                                                        <h6 className="text-lg"> {review.name} - <small><i>
                                                            {review.date?.toLocaleDateString()}
                                                        </i></small> </h6>
                                                        <Rating value={review.rating} readOnly cancel={false} className="my-2" pt={{
                                                            onIcon: { className: '!text-primary' }
                                                        }} />
                                                        <p>
                                                            {review.review}
                                                        </p>

                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <h1 className="text-3xl"> Yorum Yap </h1>
                                        <small className="">Gerekli alanlar işaretlendi *</small>
                                        <div className="my-1">
                                            {/* rating */}
                                            <form action="" className="w-full flex flex-col gap-y-2"
                                                onSubmit={formik.handleSubmit}
                                            >

                                                <div className="flex flex-col">
                                                    <div className="flex flex-row">

                                                        <p className="mr-2 text-lg text-[#6F6F6F]">Puanınız * :</p>
                                                        <Rating cancel={false} className=""
                                                            name="rating" id="rating"
                                                            value={formik.values.rating}
                                                            onChange={(e) => formik.setFieldValue("rating", e.value)}
                                                            pt={{
                                                                onIcon: { className: '!text-primary' }
                                                            }}
                                                        />
                                                    </div>
                                                    {formik.errors.rating && formik.touched.review ? (
                                                        <div className="text-red-500 text-sm mt-1">{formik.errors.rating}</div>
                                                    ) : null}
                                                </div>

                                                <div className="flex flex-col">
                                                    <label htmlFor="review" className="text-lg text-[#6F6F6F] mb-1">Yorumunuz * :</label>
                                                    <InputTextarea id="review" rows={5} cols={30} autoResize className={`${formik.errors.review && formik.touched.review && "!border-red-500"}`}
                                                        value={formik.values.review}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.review && formik.touched.review ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.review}</div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="name" className="text-lg text-[#6F6F6F]">Adınız * :</label>
                                                    <InputText id="name" className={`${formik.errors.name && formik.touched.name && "!border-red-500"}`}
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.name && formik.touched.name ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="email" className="text-lg text-[#6F6F6F]">E-posta * :</label>
                                                    <InputText id="email" className={`${formik.errors.email && formik.touched.email && "!border-red-500"}`}
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.errors.email && formik.touched.email ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                                    ) : null}
                                                </div>

                                                <div className="flex flex-col mt-4">
                                                    <button className='md:w-1/3 w-full h-12 bg-primary text-white text-xl font-bold rounded-xl  
                                                                    hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                                                                    transition duration-300 ease-in-out
                                                                '>
                                                        Gönder
                                                    </button>

                                                </div>


                                            </form>



                                        </div>
                                    </div>
                                </div>


                            </TabPanel>

                        </TabView>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetail