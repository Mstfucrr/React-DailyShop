import { addAnswerToReview, addReviewToProduct, deleteReviewFromProduct } from '@/services/product/product.service'
import { IAnswer, IProduct, IReview } from '@/shared/types'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Rating } from 'primereact/rating'
import { useState } from 'react'
import { FaComment, FaTrashAlt, FaSpinner, FaCommentAlt, FaCommentSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { reviewValidationSchema } from '@/shared/validationSchemas'
import { classNames } from 'primereact/utils'
import { MdReportProblem } from 'react-icons/md'
import { reportReview, reportUser } from '@/services/report/report.service'
import { SelectButton } from 'primereact/selectbutton'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Fieldset } from 'primereact/fieldset'

type Props = {
    reviews: IReview[] | undefined,
    product: IProduct
}

const ProductReview = ({ reviews, product }: Props) => {

    const [addReviewLoading, setAddReviewLoading] = useState<boolean>(false)
    const { token, isAuthorized, auth } = useSelector(authSelector)
    const [answerReview, setAnswerReview] = useState<number | undefined>(undefined)
    const [answerReviewText, setAnswerReviewText] = useState<string>('')
    const [reportMessage, setReportMessage] = useState<string>('')
    const [reportType, setReportType] = useState<string>('review')
    const [visible, setVisible] = useState(false)
    const [repUserId, setRepUserId] = useState<number>(0)
    const [repReviewId, setRepReviewId] = useState<number>(0)

    const showErrorMessage = (message: string) => {
        const toast: IToast = { severity: 'error', summary: "Hata", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }

    const dispatch = useDispatch()
    // validate for review

    // Yorum Yap
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

    // Yorumu Yanıtla
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
        if (data) {
            const toast: IToast = { severity: 'success', summary: "Başarılı", detail: data.message, life: 3000 }
            dispatch(SET_TOAST(toast))
        }
        setAnswerReview(undefined)
        setAnswerReviewText('')

    }

    // Yorumu Şikayet Et
    const handleReportReview = async (reviewId: number, reportMessage: string) => {
        // report review
        if (!reportMessage) return showErrorMessage("Şikayet sebebi boş olamaz")
        const repVal = {
            message: reportMessage
        }
        console.log(repVal)
        const [err, data] = await to(reportReview(reviewId, repVal, token))
        if (err) return showErrorMessage(err.message)
        if (data) return showSuccess(data.message)
    }

    // Kullanıcıyı Şikayet Et
    const handleReportUser = async (userId: number, reportMessage: string) => {
        // report user
        if (!reportMessage) return showErrorMessage("Şikayet sebebi boş olamaz")
        const repVal = {
            message: reportMessage
        }
        console.log(repVal)
        const [err, data] = await to(reportUser(userId, repVal, token))
        if (err) return showErrorMessage(err.message)
        if (data) return showSuccess(data.message)
    }

    // Yorumu Sil
    const handleDeleteReview = async (rewId: number) => {

        if (!product) return

        const [err, data] = await to(deleteReviewFromProduct(rewId, token))
        if (err) return showErrorMessage(err.message)
        if (data) {
            showSuccess(data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
    }

    // Yorumu Yanıtla
    const answerReviewTemplete = (review: any) => {
        return (
            <div className="flex flex-col m-3 p-3 gap-4">
                <InputText className="w-full" placeholder="Yanıtınızı giriniz"
                    value={answerReviewText.indexOf('@' + review.user?.email) == -1
                        ? '@' + review.user?.email + ' ' + answerReviewText
                        : answerReviewText
                    }
                    // commenteın başında @ile başlayacak ve @user.email şeklinde olacak
                    onChange={(e) => setAnswerReviewText(e.target.value)}
                />
                <button className="bg-primary text-white px-3 py-2 rounded-md w-min
                    hover:bg-primaryDark transition-all duration-300 ease-in-out"
                    onClick={() => handleAnswerReview(review.id)}
                    disabled={answerReviewText.length < 4}>Gönder</button>

            </div>
        )
    }

    // Yorumu Sil
    const deleteReviewTemplete = (reviewId: number) => {
        return <button className="text-primary hover:text-primaryDark text-sm transition-all duration-300 ease-in-out flex flex-col items-center"
            onClick={() => handleDeleteReview(reviewId)}
        >
            <FaTrashAlt className="inline mr-2 w-3" />
            Yorumu Sil
        </button>

    }

    // Şikayet Et
    const reportTemplete = (reviewId?: number, userId?: number) => {
        return (
            <div className="flex flex-col">

                <button className="text-primary flex flex-col text-sm items-center hover:text-primaryDark transition-all duration-300 ease-in-out"
                    onClick={() => {
                        setVisible(true)
                        setRepReviewId(reviewId ?? 0)
                        setRepUserId(userId ?? 0)
                    }}
                >
                    <MdReportProblem className="inline mr-2 w-3" />
                    Şikayet Et
                </button>

            </div>
        )
    }

    // eğer yorumu yazan kişi bu ürünü Almışsa icon
    const userPurchasedThisProductTemplete = (image: string) => {
        return (
            <div className="relative m-2">
                <div className="before:before-content flex flex-col items-center text-primary text-sm border-4 border-primary">
                    <Avatar image={image} size={"large"}
                    />
                </div>
            </div>
        )
    }

    // Yorum Templete
    const reviewTemplete = (review: IReview) => {
        return <motion.div className="flex items-start mx-4 my-2" key={review.date}
            // elemanların sıralı gelmesi için
            variants={variants}
        >

            {review.userPurchasedThisProduct ?
                userPurchasedThisProductTemplete(review.user?.profileImage ?? '')
                :
                <Avatar image={review.user?.profileImage} size={"large"}
                    className="m-2"
                />
            }
            <div className="flex-1">
                <div className="flex flex-row flex-wrap sm:gap-7 gap-1 text-xs items-center">
                    <h6 className="text-lg"> {review.user?.name} </h6>
                    {/* eğer yorumu yazan kişi bu ürünü Almışsa icon */}


                    {review?.date?.split('T')[0]}
                </div>
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
                        onClick={() => setAnswerReview(review.id)}>
                        <FaComment className="inline mr-2" />
                        Yanıtla
                    </button>
                    {/* iptal */}
                    {answerReview == review.id &&
                        <button className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out"
                            onClick={() => {
                                setAnswerReview(undefined)
                                setAnswerReviewText('')
                            }}>
                            <FaCommentSlash className="inline mr-2 w-6" />
                            İptal
                        </button>
                    }

                </div>

                {answerReview == review.id &&
                    answerReviewTemplete(review)
                }

                <Fieldset className="mt-4"
                    toggleable collapsed
                    legend={<div className="flex flex-row gap-x-2 text-primary hover:text-primaryDark transition-all duration-300 ease-in-out">
                        <FaComment className="inline mr-2" />
                        Yanıtlar ({review.answers?.length ?? 0})
                    </div>}

                    collapseIcon="null"
                    expandIcon="null"
                    pt={{
                        toggler: { className: 'bg-white !px-4 !py-3' }
                    }}

                >

                    {/* Answers */}
                    {review.answers?.map((answer) => (
                        reviewAnswersTemplete(answer)
                    ))}

                </Fieldset>

            </div>

            {/* eğer yorumu yazan kişi giriş yapmışsa ve yorumu silmek istiyorsa */}
            <div className="flex">

                {isAuthorized &&
                    <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
                        {review.user?.id == auth.id &&
                            deleteReviewTemplete(review.id)
                        }
                        {/* Şikayet Et */}
                        {review.user?.id != auth.id &&
                            reportTemplete(review.id, review.user?.id)
                        }
                    </div>
                }

            </div>

        </motion.div>
    }

    // Yorum Yanıt Templete
    const reviewAnswersTemplete = (answer: IAnswer) => {
        return <div className="flex items-start mx-4 my-4 border-l-4" key={"answer-" + answer.id}>
            {/* ürünü satın aldıysa border var ve sol üstünde tik yanında ürünü satın aldı yazısı */}
            {answer.userPurchasedThisProduct ?
                userPurchasedThisProductTemplete(answer.user?.profileImage ?? '')
                :
                <Avatar image={answer.user?.profileImage} size={"large"}
                    className="m-2"
                />
            }
            <div className="flex-1">
                <div className="flex flex-row flex-wrap sm:gap-7 gap-1 text-xs items-center">
                    <h6 className="text-lg"> {answer.user?.name} </h6>
                    {/* eğer yorumu yazan kişi bu ürünü Almışsa icon */}
                    {answer?.date?.split('T')[0]}
                </div>
                <small>{answer.user?.email}</small>
                <p> {answer.comment} </p>

                <div className="flex flex-row gap-x-2 mt-2">
                    <button className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out" onClick={() => setAnswerReview(answer.id)}>
                        <FaComment className="inline mr-2" />
                        Yanıtla
                    </button>
                    {/* iptal */}
                    {answerReview == answer.id &&
                        <button className="text-primary hover:text-primaryDark transition-all duration-300 ease-in-out"
                            onClick={() => {
                                setAnswerReview(undefined); setAnswerReviewText('')
                            }}>
                            <FaCommentSlash className="inline mr-2 w-6" />
                            İptal
                        </button>
                    }

                </div>
                {answerReview == answer.id &&
                    answerReviewTemplete(answer)
                }

            </div>
            {/* eğer yorumu yazan kişi giriş yapmışsa ve yorumu silmek istiyorsa */}
            <div className="flex">

                {isAuthorized &&
                    <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
                        {answer.user?.id == auth.id &&
                            deleteReviewTemplete(answer.id)
                        }
                        {/* Şikayet Et */}
                        {answer.user?.id != auth.id &&
                            reportTemplete(answer.id, answer.user?.id)
                        }
                    </div>
                }
            </div>

        </div>
    }

    const variants = {
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.1
            }
        },
        initial: {
            opacity: 0,
            x: -100,
        }
    }

    return (
        <div className="flex flex-col lg:flex-row w-full px-5 gap-x-3 gap-y-4 mt-6">
            <div className="w-full flex flex-col">
                <h1 className="text-3xl">
                    "{product.name}" için {reviews?.length} Yorum
                </h1>
                <Dialog header="Şikayet Et" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} modal draggable={false} resizable={false}>
                    <>
                        <h1 className="text-lg my-2">Şikayet Sebebi</h1>
                        {/* kullanıcı ya da yorumu şikayet et seçenekleri */}
                        <SelectButton
                            value={reportType}
                            options={[
                                { label: "Kullanıcıyı Şikayet Et", value: "user", className: "text-sm" },
                                { label: "Yorumu Şikayet Et", value: "review", className: "text-sm" },
                            ]}
                            onChange={(e) => { setReportType(e.value) }}
                            required
                        />
                        <br />

                        <p className="text-sm">Şikayetinizin sebebini belirtiniz</p>
                        <small className="text-xs text-gray-400">Şikayetiniz incelendikten sonra size geri dönüş yapılacaktır</small>
                        <br />
                        <InputTextarea
                            className="w-full" rows={5} cols={30} autoResize value={reportMessage}
                            onChange={(e) => { setReportMessage(e.target.value) }}
                        />

                        <div className="flex flex-row gap-2 mt-4">
                            <Button label="Gönder" icon="pi pi-check" onClick={() => {
                                if (reportType == 'review')
                                    handleReportReview(repReviewId, reportMessage)
                                else
                                    handleReportUser(repUserId, reportMessage)
                                setVisible(false)
                            }} severity='danger' />
                            <Button label="İptal" icon="pi pi-times" onClick={() => setVisible(false)} severity='secondary' />
                        </div>
                    </>
                </Dialog>
                <AnimatePresence>

                    <motion.div className="flex flex-col w-full"
                        variants={variants}
                        animate="animate"
                        initial="initial"
                    >
                        {reviews?.filter(review => review.status == "approved").map((review) => (
                            reviewTemplete(review)
                        ))}
                    </motion.div>
                </AnimatePresence>
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