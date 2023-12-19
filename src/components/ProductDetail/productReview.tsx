import { addAnswerToReview, addReviewToProduct, deleteReviewFromProduct } from '@/services/product/product.service'
import { IProduct, IReview } from '@/shared/types'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Rating } from 'primereact/rating'
import { useState } from 'react'
import { FaComment, FaTrashAlt, FaSpinner, FaCommentAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { reviewValidationSchema } from '@/shared/validationSchemas'
import { classNames } from 'primereact/utils'

type Props = {
    reviews: IReview[] | undefined,
    setReviews: React.Dispatch<React.SetStateAction<IReview[]>>,
    product: IProduct
}

const ProductReview = ({ reviews, setReviews, product }
    : Props) => {

    const [addReviewLoading, setAddReviewLoading] = useState<boolean>(false)
    const { token, isAuthorized, auth } = useSelector(authSelector)

    const dispatch = useDispatch()
    // validate for review

    const handleAddReview = async (values: any) => {
        if (!product) return
        const review = {
            rating: values.rating,
            comment: values.comment,
        }
        setAddReviewLoading(true)
        const [err, data] = await to(addReviewToProduct(product.id, review, token))
        if (err) {
            const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            setAddReviewLoading(false)
            return
        }
        if (data) {
            const toast: IToast = { severity: 'success', summary: "Başarılı", detail: data.message, life: 3000 }
            dispatch(SET_TOAST(toast))
        }
        setAddReviewLoading(false)
    }

    const handleAnswerReview = async (parentReviewId: number) => {
        const answerReview = {
            parentReviewId: parentReviewId,
            comment: answerReviewText,
        }
        const [err, data] = await to(addAnswerToReview(product.id, answerReview, token))
        if (err) {
            const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        if (data.data != null) {
            setReviews(data.data)
        }
        setAnswerReview(undefined)
        setAnswerReviewText('')

    }

    const [answerReview, setAnswerReview] = useState<number | undefined>(undefined)
    const [answerReviewText, setAnswerReviewText] = useState<string>('')


    const handleDeleteReview = async (rewId: number) => {

        if (!product) return

        const [err, data] = await to(deleteReviewFromProduct(product.id, rewId, token))
        if (err) {
            const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        if (data.data != null) {
            setReviews(data.data)
        }
    }

    const answerReviewTemplete = (review: IReview) => {
        return (
            <div className="flex flex-col m-3 p-3 gap-4">
                <span className="p-input-icon-left">
                    <i className="!text-blue-600">{review.user?.email}</i>
                    <InputText className=" sm:w-1/2 w-full"
                        value={answerReviewText}
                        onChange={(e) => setAnswerReviewText(e.target.value)}
                    />
                </span>
                <button className="bg-primary text-white px-3 py-2 rounded-md w-min
                    hover:bg-primaryDark transition-all duration-300 ease-in-out"
                    onClick={() => handleAnswerReview(review.id)}
                    disabled={answerReviewText.length < 4}>Gönder</button>

            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row w-full px-5 gap-x-3 gap-y-4 mt-6">
            <div className="w-full flex flex-col">
                <h1 className="text-3xl">
                    "{product.name}" için {reviews?.length} Yorum
                </h1>
                <div className="flex flex-col w-full">
                    {reviews?.filter(review => review.status == "approved").map((review) => (
                        <div className="flex items-start mx-4 my-2" key={review.date}>
                            <Avatar image={review.user?.profileImage} size={"large"}
                                className="m-2"
                            />
                            <div className="flex-1">
                                <h6 className="text-lg"> {review.user?.name} - <small><i>
                                    {review.date}
                                    <br />
                                </i></small> </h6>
                                <small>{review.user?.email}</small>
                                <Rating value={review.rating} readOnly cancel={false} className="my-2" pt={{
                                    onIcon: { className: '!text-primary' }
                                }} />
                                <p>
                                    {review.comment}
                                </p>
                                {/* Yanıtla */}
                                <div className="flex flex-row gap-x-2 mt-2">
                                    <button className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out"
                                        onClick={() => setAnswerReview(review.id)}
                                    >
                                        <FaComment className="inline mr-2" />
                                        Yanıtla
                                    </button>
                                    {/* iptal */}
                                    {answerReview == review.id &&
                                        <button className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out"
                                            onClick={() => {
                                                setAnswerReview(undefined)
                                                setAnswerReviewText('')
                                            }}
                                        >
                                            <FaTrashAlt className="inline mr-2" />
                                            İptal
                                        </button>
                                    }

                                </div>
                                {answerReview == review.id &&
                                    answerReviewTemplete(review)
                                }
                            </div>
                            {
                                review.user?.id == auth.id &&
                                <div className="">
                                    <button className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out"
                                        onClick={() => handleDeleteReview(review.id)}
                                    >
                                        <FaTrashAlt className="inline mr-2" />
                                        Yorumu Sil
                                    </button>

                                </div>
                            }

                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <h1 className="text-3xl"> Yorum Yap </h1>
                {isAuthorized ?
                    <>
                        <small className="">Gerekli alanlar işaretlendi *</small>
                        <div className="my-1">
                            <Formik
                                initialValues={{
                                    rating: 0,
                                    comment: ''
                                }}
                                validationSchema={reviewValidationSchema}
                                onSubmit={(values) => handleAddReview(values)}
                            >
                                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                                    <Form action="" className="w-full flex flex-col gap-y-2"
                                        onSubmit={handleSubmit}
                                    >

                                        <div className="flex flex-col">
                                            <div className="flex flex-row">

                                                <p className="mr-2 text-lg text-[#6F6F6F]">Puanınız * :</p>
                                                <Rating cancel={false} className=""
                                                    name="rating" id="rating"
                                                    value={values.rating}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    pt={{
                                                        onIcon: { className: '!text-primary' }
                                                    }}
                                                />
                                            </div>
                                            {errors.rating && touched.rating ? (
                                                <div className="text-red-500 text-sm mt-1">{errors.rating}</div>
                                            ) : null}
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="review" className="text-lg text-[#6F6F6F] mb-1">Yorumunuz * :</label>
                                            <InputTextarea
                                                id="review"
                                                name="comment"
                                                rows={5} cols={30} autoResize
                                                className={classNames('w-full', { 'p-invalid': errors.comment && touched.comment })}
                                                value={values.comment}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.comment && touched.comment ? (
                                                <div className="text-red-500 text-sm">{errors.comment}</div>
                                            ) : null}
                                        </div>

                                        <div className="flex flex-col mt-4">
                                            <button className='md:w-1/3 w-full h-12 bg-primary text-white text-xl font-bold rounded-xl  
                                                                    hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                                                                    transition duration-300 ease-in-out'
                                                type="submit" disabled={addReviewLoading}
                                            >
                                                {addReviewLoading ?
                                                    <div className="flex items-center justify-center">
                                                        <FaSpinner className="mr-2 animate-spin" />
                                                        Yorum Yapılıyor...
                                                    </div>
                                                    : <>
                                                        <FaCommentAlt className="inline mr-2" /> Yorum Yap
                                                    </>

                                                }

                                            </button>

                                        </div>


                                    </Form>
                                )}




                            </Formik>



                        </div>
                    </>
                    :
                    // arka plan blurlu Giriş yap kısmı link li
                    <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-100 bg-opacity-50 rounded-xl">
                        <h1 className="text-2xl text-center">Yorum yapabilmek için giriş yapmalısınız</h1>
                        <Link to="/login" className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out text-xl">Giriş Yap</Link>
                    </div>
                }

            </div>
        </div>
    )
}

export default ProductReview