import { IProduct, IReview } from '@/shared/types'
import { Galleria } from 'primereact/galleria'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Rating } from 'primereact/rating'
import { RadioButton } from 'primereact/radiobutton'
import { FaCommentAlt, FaHeart, FaInfoCircle, FaMinus, FaPencilAlt, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { MdDescription } from 'react-icons/md'
import { TabView, TabPanel } from 'primereact/tabview'
import { Messages } from 'primereact/messages'
import { Link, useParams } from 'react-router-dom'
import { getProductById, getReviewsByProductId } from '@/services/product/product.service'
import { setProductCookie } from '@/helper/cookieUtils'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '@/store/auth'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { addToCart } from '@/services/order/order.service'
import { IaddToCartRequest } from '@/services/order/types'
import { InputNumber } from 'primereact/inputnumber'
import to from 'await-to-js'
import { ProgressSpinner } from 'primereact/progressspinner'
import UpdateProduct from '../account/userProducts/UpdateProduct'
import { favoritesService } from '@/services/favorites/favorites.service'
import ProductReview from './productReview'
import { productStatus } from '@/shared/constants'
import { AnimatePresence } from 'framer-motion'

const ProductDetail = () => {
  const [images, setImages] = useState<{ source: string }[] | string | undefined>(undefined)
  const { id } = useParams()
  const [productLoading, setProductLoading] = useState<boolean>(false)
  const [addCartLoading, setAddCartLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<IProduct | null>(null)
  const [selectSize, setSelectSize] = useState<string | undefined>(undefined)
  const [selectColor, setSelectColor] = useState<string | undefined>(undefined)
  const [reviews, setReviews] = useState<IReview[]>([])
  // const size = [{ name: "S", key: "s" }]
  const [quantity, setQuantity] = useState(1)
  const msgs = useRef<Messages>(null)
  const [sizes, setSizes] = useState<{ name: string; key: string }[] | undefined>(undefined)
  const [colors, setColors] = useState<{ name: string; key: string }[] | undefined>(undefined)
  const dispatch = useDispatch()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  // kullanıcı giriş yapmış mı konrol et ve hangi üründe ne kadar gezindiğini cooki ye kaydet

  const { auth, isAuthorized, token } = useSelector(authSelector)

  useEffect(() => {
    if (auth && product) {
      const startTime = Date.now() // Sayfa açılma zamanı
      // Sayfa kapatıldığında veya başka bir sayfaya geçildiğinde
      const beforeUnloadHandler = () => {
        const endTime = Date.now() // Sayfa kapatılma zamanı
        const durationInSeconds = (endTime - startTime) / 1000 // Saniye cinsinden geçen süre
        if (product) setProductCookie(product.id, durationInSeconds)
      }

      // beforeunload olayını dinle
      window.addEventListener('beforeunload', beforeUnloadHandler)

      return () => {
        // Komponent kaldırıldığında, olay dinleyiciyi kaldır
        window.removeEventListener('beforeunload', beforeUnloadHandler)
      }
    }
  }, [auth, product])

  const fetchProductReviews = useCallback(
    async (productId: number) => {
      if (!productId) return
      const [err, data] = await to(getReviewsByProductId(productId, token))
      if (err) {
        const toast: IToast = {
          severity: 'error',
          summary: 'Hata',
          detail: err.message,
          life: 3000
        }
        dispatch(SET_TOAST(toast))
        return
      }
      if (data.data) {
        const reviews = data.data as IReview[]
        setReviews(reviews)
        if (product)
          setProduct({
            ...product,
            rating: reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
          })
      }
    },
    [dispatch, product, token]
  )

  const fetchData = useCallback(async () => {
    setProductLoading(true)
    if (!id) return
    const [err, data] = await to(getProductById(parseInt(id), token))
    if (err) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Hata',
          detail: err.message,
          closable: false
        }
      ])
      setProductLoading(false)
      return
    }
    if (data.data) {
      const fetchedProduct = (await data.data) as IProduct
      setProduct(fetchedProduct)
      setSizes(
        fetchedProduct.sizes?.map((size: string) => ({
          name: size,
          key: size
        }))
      )
      setColors(
        fetchedProduct.colors?.map((color: string) => ({
          name: color,
          key: color
        }))
      )
      const imagesSources = []
      fetchedProduct.images?.forEach((image: string) => {
        imagesSources.push(image)
      })
      if (fetchedProduct.image) imagesSources.push(fetchedProduct.image)
      setImages(imagesSources.map((source: string) => ({ source: source })))
      fetchProductReviews(fetchedProduct.id)
    }
    setProductLoading(false)
  }, [fetchProductReviews, id, token])

  useEffect(() => {
    fetchData()
  }, [])

  const itemTemplate = (item: any) => {
    return <img src={item.source} alt={item.alt} style={{ width: '100%', display: 'block' }} />
  }

  const thumbnailTemplate = (item: any) => {
    return (
      <img
        src={item.source}
        alt={item.alt}
        style={{
          display: 'block',
          width: 'auto',
          height: 90,
          objectFit: 'cover'
        }}
      />
    )
  }

  const handleAddToCart = async () => {
    if (!product) return
    if (!isAuthorized) {
      const toast: IToast = {
        severity: 'error',
        summary: 'Hata',
        detail: 'Sepete eklemek için giriş yapmalısınız',
        life: 3000
      }
      dispatch(SET_TOAST(toast))
      return
    }

    if ((sizes && sizes?.length > 0 && !selectSize) || (colors && colors?.length > 0 && !selectColor)) {
      const toast: IToast = {
        severity: 'error',
        summary: 'Hata',
        detail: 'Lütfen renk ve beden seçiniz',
        life: 3000
      }
      dispatch(SET_TOAST(toast))
      return
    }

    const cartAdd: IaddToCartRequest = {
      quantity: quantity,
      size: selectSize,
      color: selectColor
    }
    setAddCartLoading(true)
    const [err, data] = await to(addToCart(product.id, cartAdd, token))
    if (err) {
      const toast: IToast = {
        severity: 'error',
        summary: 'Hata',
        detail: err.message,
        life: 3000
      }
      dispatch(SET_TOAST(toast))
      setAddCartLoading(false)
      return
    }
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: addToCartSuccessTemplete(data.message),
      life: 5000
    }
    dispatch(SET_TOAST(toast))
    setAddCartLoading(false)
  }

  const addToCartSuccessTemplete = (message: string) => {
    return (
      <div className='flex flex-col justify-center'>
        <div className='flex'>
          <img src={product?.image as string} alt={product?.name} className='mx-auto h-20 w-20' />
          <div className='flex flex-col'>
            <h2 className='text-xl font-semibold'>{message}</h2>
            <h3 className='text-md font-semibold'>{product?.name}</h3>
            <h3 className='text-md font-semibold'>
              {quantity} x {product?.price} TL
            </h3>
          </div>
        </div>
        <div className='mt-4 flex flex-row gap-x-2'>
          <Link to='/cart' className='rounded-md bg-primary px-3 py-2 text-white'>
            Sepete Git
          </Link>
          <Link to={`/shop/${product?.categoryId}`} className='rounded-md bg-primary px-3 py-2 text-white'>
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    )
  }

  const handleAddFavorite = async (id: number) => {
    const [err, data] = await to(favoritesService.addFavorite(token, id))
    if (err) return console.log(err)
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: data?.message,
      life: 3000
    }
    dispatch(SET_TOAST(toast))
  }

  return (
    <>
      {productLoading && (
        <div className='flex h-36 w-full items-center justify-center'>
          <ProgressSpinner strokeWidth='5' animationDuration='.5s' />
        </div>
      )}
      {!productLoading && product != null ? (
        <div className='lg:px-20'>
          {/* image and info */}
          <div className='mt-24 flex flex-col justify-around gap-y-5 md:flex-row'>
            <div className='w-full basis-2/5'>
              {images && (
                <Galleria
                  numVisible={4}
                  className='w-full border border-solid'
                  item={itemTemplate}
                  value={images as any}
                  thumbnail={thumbnailTemplate}
                />
              )}
            </div>
            <div className='flex basis-3/5 flex-col px-10'>
              {/* name */}
              <div className='flex w-full justify-between gap-9'>
                <h2 className='mb-2 text-3xl font-semibold text-black'>{product.name}</h2>
                <AnimatePresence>
                  {isUpdate && <UpdateProduct productUpdateId={product.id} setIsUpdate={setIsUpdate} />}
                </AnimatePresence>
                {isAuthorized && auth.id == product?.userId && (
                  <>
                    <button
                      className='text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
                      onClick={() => setIsUpdate(true)}
                    >
                      <FaPencilAlt className='mr-2 inline' />
                      Ürünü Düzenle
                    </button>
                  </>
                )}
              </div>
              {/* rating */}
              <div className='my-2 flex flex-row gap-x-4'>
                <Rating
                  value={product.rating}
                  readOnly
                  cancel={false}
                  pt={{
                    onIcon: { className: '!text-primary' }
                  }}
                />
                ( {reviews?.length} İzlenim )
              </div>
              {/* price */}
              <h2 className='my-2 text-3xl font-semibold text-black'>{product.price}₺</h2>
              {/* description */}
              <div className='my-4 leading-6'>
                <div className='ql-editor'>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.description.substring(0, 200) + '...'
                    }}
                  ></p>
                </div>
              </div>
              {/* sizes */}
              {sizes && sizes.length > 0 && (
                <div className='flex flex-row flex-wrap items-center gap-x-5'>
                  <h2 className='text-lg font-semibold'>Beden :</h2>
                  {sizes.map((size: any) => (
                    <div className='align-items-center flex' key={'size-' + size.name}>
                      <RadioButton
                        inputId={`size-${size.name}`}
                        name='size'
                        value={size}
                        onChange={e => setSelectSize(e.value.name as string)}
                        checked={selectSize === size.name}
                      />
                      <label htmlFor={size.key} className='ml-2'>
                        {size.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {/* colors */}
              {colors && colors.length > 0 && (
                <div className='mt-3 flex flex-row flex-wrap items-center gap-x-5'>
                  <h2 className='text-lg font-semibold'>Renkler :</h2>
                  {colors.map((color: any) => (
                    <div className='align-items-center flex' key={'color-' + color.name}>
                      <RadioButton
                        inputId={`color-${color.name}`}
                        name='color'
                        value={color}
                        onChange={e => setSelectColor(e.value.name as string)}
                        checked={selectColor === color.name}
                        pt={{
                          input: {
                            className: selectColor == color.name ? '!bg-primary !border-primary' : ''
                          }
                        }}
                      />
                      <label htmlFor={color.key} className='ml-2' style={{ color: color.name }}>
                        {color.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div className='mt-5 flex flex-wrap items-center gap-6'>
                <div className='relative flex max-w-[130px] flex-nowrap'>
                  <div>
                    <button
                      className='inline-block border-primary bg-primary px-3 py-3 leading-6 text-[#212529] transition-all duration-300 ease-in-out hover:bg-primaryDark hover:text-white'
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity === 1}
                    >
                      <FaMinus />
                    </button>
                  </div>

                  <InputNumber
                    type='text'
                    value={quantity}
                    onChange={e => {
                      if (e.value) setQuantity(e.value)
                    }}
                    inputClassName='relative w-[3%] flex-[1_1_auto] text-center bg-secondary !py-1 px-2 outline-none text-sm'
                    allowEmpty={false}
                    min={1}
                  />
                  <div>
                    <button
                      className='inline-block border-primary bg-primary px-3 py-3 leading-6 text-[#212529] transition-all duration-300 ease-in-out hover:bg-primaryDark hover:text-white'
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <button
                    className='inline-block border-primary bg-primary px-3 py-2 leading-6 text-[#212529] transition-all duration-300 ease-in-out hover:bg-primaryDark hover:text-white'
                    onClick={() => handleAddToCart()}
                    disabled={addCartLoading}
                  >
                    {!addCartLoading ? (
                      <>
                        <FaShoppingCart className='mr-3 inline' />
                        Sepete Ekle
                      </>
                    ) : (
                      <ProgressSpinner
                        strokeWidth='5'
                        animationDuration='.5s'
                        style={{ width: '20px', height: '20px' }}
                      />
                    )}
                  </button>

                  <button
                    className='inline-block border-primary bg-primary px-3 py-2 leading-6 text-[#212529] transition-all duration-300 ease-in-out hover:bg-primaryDark hover:text-white'
                    onClick={() => handleAddFavorite(product.id)}
                  >
                    <FaHeart className='mr-3 inline' />
                    Favorilere Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description Information Reviews */}
          <div className='row'>
            <div className='card mt-8'>
              <TabView className='flex flex-col items-center' panelContainerClassName='w-full !p-0'>
                <TabPanel
                  header={
                    <div className='text-primary'>
                      <MdDescription className='mr-2 inline' />
                      Tanım
                    </div>
                  }
                >
                  <h2 className='text-2xl font-semibold'>{product.name}</h2>

                  <div className='ql-snow'>
                    <div className='ql-editor'>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: product.description
                        }}
                      ></p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel
                  header={
                    <div className='text-primary'>
                      <FaInfoCircle className='mr-2 inline' />
                      Bilgi
                    </div>
                  }
                >
                  <div className='mt-2 flex flex-col px-4'>
                    <p className=''>
                      <span className='font-semibold'>Ürün Durumu : </span>{' '}
                      {productStatus.find(status => status.value === product.status)?.label}
                    </p>
                    <p className=''>
                      <span className='font-semibold'>Ürün Stok Durumu : </span> {product.stock}
                    </p>
                  </div>
                </TabPanel>

                <TabPanel
                  header={
                    <div className='text-primary'>
                      <FaCommentAlt className='mr-2 inline' />
                      Yorumlar
                    </div>
                  }
                >
                  <ProductReview reviews={reviews} product={product} />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      ) : (
        <Messages ref={msgs} className='mx-auto w-full sm:w-3/4 ' />
      )}
    </>
  )
}

export default ProductDetail
