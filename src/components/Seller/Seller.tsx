import { addProduct } from '@/services/product/product.service'
import { IProductInfo } from '@/services/product/types'
import { authSelector } from '@/store/auth'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import to from 'await-to-js'
import { useFormik } from 'formik'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageUpload from './ImageUpload'
import ProductInfo from './ProductInfo'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { productInfoValidationSchema } from '@/shared/validationSchemas'

const Seller = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [images, setImages] = useState<File[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { token } = useSelector(authSelector)
  const dispatch = useDispatch()

  const [productInfo, setProductInfo] = useState<IProductInfo>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    status: '',
    categoryId: 0 as number,
    colors: [] as string[] | undefined,
    sizes: [] as string[] | undefined
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      stock: 0,
      description: '',
      status: '',
      category: '',
      colors: []
    },
    validationSchema: productInfoValidationSchema,
    onSubmit: async () => {
      setLoading(true)

      await handleAddProduct().then(() => setLoading(false))
    }
  })

  const handleAddProduct = async () => {
    if (coverImage !== null && images && images?.length !== 0) {
      const formData = new FormData()

      Object.entries(productInfo).forEach(([key, value]) => {
        if (key === 'colors' || key === 'sizes') return
        formData.append(key, value)
      })
      productInfo.colors?.forEach(color => formData.append('Colors', color))
      productInfo.sizes?.forEach(size => formData.append('Sizes', size))
      formData.append('BodyImage', coverImage, coverImage.name)
      images.forEach(async image => {
        formData.append(`ProductImages`, image, image.name)
      })
      const [err, res] = await to(addProduct(formData, token))
      if (err) {
        const toast: IToast = {
          severity: 'error',
          summary: 'Hata',
          detail: err.message,
          life: 3000
        } // service çalışmadı
        dispatch(SET_TOAST(toast))
        return
      }
      const toast: IToast = {
        severity: 'success',
        summary: 'Başarılı',
        detail: res?.message,
        life: 3000
      }
      dispatch(SET_TOAST(toast))
    } else {
      console.log(coverImage, ' \n', images, ' \n', productInfo.name)
      const toast: IToast = {
        severity: 'info',
        summary: 'Uyarı',
        detail: 'Lütfen tüm alanları doldurduğunuzdan emin olun.',
        life: 3000
      } // service çalışmadı
      dispatch(SET_TOAST(toast))
    }
  }

  const LoadingTemplete = useCallback(() => {
    // tüm sayfayı kapsayacak şekilde spinner göster
    return (
      <div className='fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black bg-opacity-50'>
        {/* ürün eklendi mi  */}
        <ProgressSpinner className='!w-24' strokeWidth='5' animationDuration='.8s' fill='white' />
        <span className='absolute bottom-1/2 animate-bounce text-5xl font-bold tracking-wider text-primaryDark'>
          {' '}
          D{' '}
        </span>
        <Button severity='warning' label='İptal et' className='w-1/5 !text-xl' onClick={() => setLoading(false)} />
      </div>
    )
  }, [])

  return (
    <section className='my-10 h-auto px-5 lg:px-20'>
      {loading && LoadingTemplete()}
      <div className='flex h-full w-full flex-col justify-around gap-10 md:flex-row'>
        {/* cover and another images */}
        <div className='flex h-full w-full basis-2/5'>
          <ImageUpload
            setcoverImage={setCoverImage}
            setImages={setImages as React.Dispatch<React.SetStateAction<File[]>>}
            productImages={images}
            coverImage={coverImage}
          />
        </div>
        {/* product informations */}
        <div className='h-full w-full basis-3/5'>
          <ProductInfo
            formik={formik}
            setProductInfo={setProductInfo as any}
            productInfo={productInfo}
            loading={loading}
          />
        </div>
      </div>
    </section>
  )
}

export default Seller
