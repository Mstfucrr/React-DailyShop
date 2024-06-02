import { addAnswerToReview, addReviewToProduct, deleteReviewFromProduct } from '@/services/product/product.service'
import { IAnswer, IProduct, IReview } from '@/shared/types'
import to from 'await-to-js'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Rating } from 'primereact/rating'
import { useState } from 'react'
import { FaComment, FaTrashAlt, FaSpinner, FaCommentAlt, FaCommentSlash } from 'react-icons/fa'
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
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import Link from 'next/link'

type Props = {
  reviews: IReview[] | undefined
  product: IProduct
}

const ProductReview = ({ reviews, product }: Props) => {
  const [addReviewLoading, setAddReviewLoading] = useState<boolean>(false)
  const { token, isAuthorized, auth } = useAuth()
  const [answerReview, setAnswerReview] = useState<number | undefined>(undefined)
  const [answerReviewText, setAnswerReviewText] = useState<string>('')
  const [reportMessage, setReportMessage] = useState<string>('')
  const [reportType, setReportType] = useState<string>('review')
  const [visible, setVisible] = useState(false)
  const [repUserId, setRepUserId] = useState<number>(0)
  const [repReviewId, setRepReviewId] = useState<number>(0)

  const showErrorMessage = (message: string) => toast.error(message)
  const showSuccess = (message: string) => toast.success(message)

  // Yorum Yap
  const handleAddReview = async (values: any) => {
    if (!product) return
    const review = {
      rating: values.rating,
      comment: values.comment
    }
    setAddReviewLoading(true)
    const [err, data] = await to(addReviewToProduct(product.id, review, token))
    if (err) {
      showErrorMessage(err.message)
      setAddReviewLoading(false)
      return
    }
    if (data) showSuccess(data.message)
    setAddReviewLoading(false)
  }

  // Yorumu Yanıtla
  const handleAnswerReview = async (parentReviewId: number) => {
    const answerReview = {
      parentReviewId: parentReviewId,
      comment: answerReviewText
    }
    const [err, data] = await to(addAnswerToReview(product.id, answerReview, token))
    if (err) return showErrorMessage(err.message)
    if (data) showSuccess(data.message)
    setAnswerReview(undefined)
    setAnswerReviewText('')
  }

  // Yorumu Şikayet Et
  const handleReportReview = async (reviewId: number, reportMessage: string) => {
    // report review
    if (!reportMessage) return showErrorMessage('Şikayet sebebi boş olamaz')
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
    if (!reportMessage) return showErrorMessage('Şikayet sebebi boş olamaz')
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
      }, 1500)
    }
  }

  // Yorumu Yanıtla
  const answerReviewTemplete = (review: any) => {
    return (
      <div className='m-3 flex flex-col gap-4 p-3'>
        <InputText
          className='w-full'
          placeholder='Yanıtınızı giriniz'
          value={
            answerReviewText.indexOf('@' + review.user?.email) == -1
              ? '@' + review.user?.email + ' ' + answerReviewText
              : answerReviewText
          }
          // commenteın başında @ile başlayacak ve @user.email şeklinde olacak
          onChange={e => setAnswerReviewText(e.target.value)}
        />
        <button
          className='w-min rounded-md bg-primary px-3 py-2 text-white
                    transition-all duration-300 ease-in-out hover:bg-primaryDark'
          onClick={() => handleAnswerReview(review.id)}
          disabled={answerReviewText.length < 4}
        >
          Gönder
        </button>
      </div>
    )
  }

  // Yorumu Sil
  const deleteReviewTemplete = (reviewId: number) => {
    return (
      <button
        className='flex flex-col items-center text-sm text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
        onClick={() => handleDeleteReview(reviewId)}
      >
        <FaTrashAlt className='mr-2 inline w-3' />
        Yorumu Sil
      </button>
    )
  }

  // Şikayet Et
  const reportTemplete = (reviewId?: number, userId?: number) => {
    return (
      <div className='flex flex-col'>
        <button
          className='flex flex-col items-center text-sm text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
          onClick={() => {
            setVisible(true)
            setRepReviewId(reviewId ?? 0)
            setRepUserId(userId ?? 0)
          }}
        >
          <MdReportProblem className='mr-2 inline w-3' />
          Şikayet Et
        </button>
      </div>
    )
  }

  // eğer yorumu yazan kişi bu ürünü Almışsa icon
  const userPurchasedThisProductTemplete = (image: string) => {
    return (
      <div className='relative m-2'>
        <div className='before:before-content flex flex-col items-center border-4 border-primary text-sm text-primary'>
          <Avatar image={image} size={'large'} />
        </div>
      </div>
    )
  }

  // Yorum Templete
  const reviewTemplete = (review: IReview) => {
    return (
      <motion.div
        className='mx-4 my-2 flex items-start'
        key={review.date}
        // elemanların sıralı gelmesi için
        variants={variants}
      >
        {review.userPurchasedThisProduct ? (
          userPurchasedThisProductTemplete(review.user?.profileImage ?? '')
        ) : (
          <Avatar image={review.user?.profileImage} size={'large'} className='m-2' />
        )}
        <div className='flex-1'>
          <div className='flex flex-row flex-wrap items-center gap-1 text-xs sm:gap-7'>
            <h6 className='text-lg'> {review.user?.name} </h6>
            {/* eğer yorumu yazan kişi bu ürünü Almışsa icon */}

            {review?.date?.split('T')[0]}
          </div>
          <small>{review.user?.email}</small>

          <Rating
            value={review.rating}
            readOnly
            cancel={false}
            className='my-2'
            pt={{
              onIcon: { className: '!text-primary' }
            }}
          />
          <p>{review.comment}</p>
          {/* Yanıtla */}

          <div className='mt-2 flex flex-row gap-x-2'>
            <button
              className='text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
              onClick={() => setAnswerReview(review.id)}
            >
              <FaComment className='mr-2 inline' />
              Yanıtla
            </button>
            {/* iptal */}
            {answerReview == review.id && (
              <button
                className='text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
                onClick={() => {
                  setAnswerReview(undefined)
                  setAnswerReviewText('')
                }}
              >
                <FaCommentSlash className='mr-2 inline w-6' />
                İptal
              </button>
            )}
          </div>

          {answerReview == review.id && answerReviewTemplete(review)}

          <Fieldset
            className='mt-4'
            toggleable
            collapsed
            legend={
              <div className='flex flex-row gap-x-2 text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'>
                <FaComment className='mr-2 inline' />
                Yanıtlar ({review.answers?.length ?? 0})
              </div>
            }
            collapseIcon='null'
            expandIcon='null'
            pt={{
              toggler: { className: 'bg-white !px-4 !py-3' }
            }}
          >
            {/* Answers */}
            {review.answers?.map(answer => reviewAnswersTemplete(answer))}
          </Fieldset>
        </div>

        {/* eğer yorumu yazan kişi giriş yapmışsa ve yorumu silmek istiyorsa */}
        <div className='flex'>
          {isAuthorized && (
            <div className='flex flex-row flex-wrap items-center justify-center gap-6'>
              {review.user?.id == auth.id && deleteReviewTemplete(review.id)}
              {/* Şikayet Et */}
              {review.user?.id != auth.id && reportTemplete(review.id, review.user?.id)}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  // Yorum Yanıt Templete
  const reviewAnswersTemplete = (answer: IAnswer) => {
    return (
      <div className='mx-4 my-4 flex items-start border-l-4' key={'answer-' + answer.id}>
        {/* ürünü satın aldıysa border var ve sol üstünde tik yanında ürünü satın aldı yazısı */}
        {answer.userPurchasedThisProduct ? (
          userPurchasedThisProductTemplete(answer.user?.profileImage ?? '')
        ) : (
          <Avatar image={answer.user?.profileImage} size={'large'} className='m-2' />
        )}
        <div className='flex-1'>
          <div className='flex flex-row flex-wrap items-center gap-1 text-xs sm:gap-7'>
            <h6 className='text-lg'> {answer.user?.name} </h6>
            {/* eğer yorumu yazan kişi bu ürünü Almışsa icon */}
            {answer?.date?.split('T')[0]}
          </div>
          <small>{answer.user?.email}</small>
          <p> {answer.comment} </p>

          <div className='mt-2 flex flex-row gap-x-2'>
            <button
              className='text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
              onClick={() => setAnswerReview(answer.id)}
            >
              <FaComment className='mr-2 inline' />
              Yanıtla
            </button>
            {/* iptal */}
            {answerReview == answer.id && (
              <button
                className='text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
                onClick={() => {
                  setAnswerReview(undefined)
                  setAnswerReviewText('')
                }}
              >
                <FaCommentSlash className='mr-2 inline w-6' />
                İptal
              </button>
            )}
          </div>
          {answerReview == answer.id && answerReviewTemplete(answer)}
        </div>
        {/* eğer yorumu yazan kişi giriş yapmışsa ve yorumu silmek istiyorsa */}
        <div className='flex'>
          {isAuthorized && (
            <div className='flex flex-row flex-wrap items-center justify-center gap-6'>
              {answer.user?.id == auth.id && deleteReviewTemplete(answer.id)}
              {/* Şikayet Et */}
              {answer.user?.id != auth.id && reportTemplete(answer.id, answer.user?.id)}
            </div>
          )}
        </div>
      </div>
    )
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
      x: -100
    }
  }

  return (
    <div className='mt-6 flex w-full flex-col gap-x-3 gap-y-4 px-5 lg:flex-row'>
      <div className='flex w-full flex-col'>
        <h1 className='text-3xl'>
          "{product.name}" için {reviews?.length} Yorum
        </h1>
        <Dialog
          header='Şikayet Et'
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
          modal
          draggable={false}
          resizable={false}
        >
          <>
            <h1 className='my-2 text-lg'>Şikayet Sebebi</h1>
            {/* kullanıcı ya da yorumu şikayet et seçenekleri */}
            <SelectButton
              value={reportType}
              options={[
                {
                  label: 'Kullanıcıyı Şikayet Et',
                  value: 'user',
                  className: 'text-sm'
                },
                {
                  label: 'Yorumu Şikayet Et',
                  value: 'review',
                  className: 'text-sm'
                }
              ]}
              onChange={e => {
                setReportType(e.value)
              }}
              required
            />
            <br />

            <p className='text-sm'>Şikayetinizin sebebini belirtiniz</p>
            <small className='text-xs text-gray-400'>
              Şikayetiniz incelendikten sonra size geri dönüş yapılacaktır
            </small>
            <br />
            <InputTextarea
              className='w-full'
              rows={5}
              cols={30}
              autoResize
              value={reportMessage}
              onChange={e => {
                setReportMessage(e.target.value)
              }}
            />

            <div className='mt-4 flex flex-row gap-2'>
              <Button
                label='Gönder'
                icon='pi pi-check'
                onClick={() => {
                  if (reportType == 'review') handleReportReview(repReviewId, reportMessage)
                  else handleReportUser(repUserId, reportMessage)
                  setVisible(false)
                }}
                severity='danger'
              />
              <Button label='İptal' icon='pi pi-times' onClick={() => setVisible(false)} severity='secondary' />
            </div>
          </>
        </Dialog>
        <AnimatePresence>
          <motion.div className='flex w-full flex-col' variants={variants} animate='animate' initial='initial'>
            {reviews?.filter(review => review.status == 'approved').map(review => reviewTemplete(review))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl'> Yorum Yap </h1>
        {isAuthorized ? (
          <>
            <small className=''>Gerekli alanlar işaretlendi *</small>
            <div className='my-1'>
              <Formik
                initialValues={{
                  rating: 0,
                  comment: ''
                }}
                validationSchema={reviewValidationSchema}
                onSubmit={values => handleAddReview(values)}
              >
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                  <Form action='' className='flex w-full flex-col gap-y-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                      <div className='flex flex-row'>
                        <p className='mr-2 text-lg text-[#6F6F6F]'>Puanınız * :</p>
                        <Rating
                          cancel={false}
                          className=''
                          name='rating'
                          id='rating'
                          value={values.rating}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          pt={{
                            onIcon: { className: '!text-primary' }
                          }}
                        />
                      </div>
                      {errors.rating && touched.rating ? (
                        <div className='mt-1 text-sm text-red-500'>{errors.rating}</div>
                      ) : null}
                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor='review' className='mb-1 text-lg text-[#6F6F6F]'>
                        Yorumunuz * :
                      </label>
                      <InputTextarea
                        id='review'
                        name='comment'
                        rows={5}
                        cols={30}
                        autoResize
                        className={classNames('w-full', {
                          'p-invalid': errors.comment && touched.comment
                        })}
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.comment && touched.comment ? (
                        <div className='text-sm text-red-500'>{errors.comment}</div>
                      ) : null}
                    </div>

                    <div className='mt-4 flex flex-col'>
                      <button
                        className='h-12 w-full rounded-xl border border-solid border-primary bg-primary text-xl  
                                                                    font-bold text-white transition duration-300 ease-in-out hover:border-primary
                                                                    hover:bg-white hover:text-primary md:w-1/3'
                        type='submit'
                        disabled={addReviewLoading}
                      >
                        {addReviewLoading ? (
                          <div className='flex items-center justify-center'>
                            <FaSpinner className='mr-2 animate-spin' />
                            Yorum Yapılıyor...
                          </div>
                        ) : (
                          <>
                            <FaCommentAlt className='mr-2 inline' /> Yorum Yap
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        ) : (
          // arka plan blurlu Giriş yap kısmı link li
          <div className='flex h-32 w-full flex-col items-center justify-center rounded-xl bg-gray-100 bg-opacity-50'>
            <h1 className='text-center text-2xl'>Yorum yapabilmek için giriş yapmalısınız</h1>
            <Link
              href='/login'
              className='text-xl text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
            >
              Giriş Yap
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductReview
