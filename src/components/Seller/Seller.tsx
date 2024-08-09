'use client'
import { IProductInfo } from '@/services/product/types'
import { useFormik } from 'formik'
import { useState } from 'react'
import ImageUpload from './ImageUpload'
import ProductInfo from './ProductInfo'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { productInfoValidationSchema } from '@/shared/validationSchemas'
import toast from 'react-hot-toast'
import { useAddProduct } from '@/services/product/use-product-service'

const LoadingTemplete = ({ resetClick }: { resetClick: () => void }) => {
  // tüm sayfayı kapsayacak şekilde spinner göster
  return (
    <div className='fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black bg-opacity-50'>
      {/* ürün eklendi mi  */}
      <ProgressSpinner className='!w-24' strokeWidth='5' animationDuration='.8s' fill='white' />
      <span className='absolute bottom-1/2 animate-bounce text-5xl font-bold tracking-wider text-primaryDark'> D </span>
      <Button severity='warning' label='İptal et' className='w-1/5 !text-xl' onClick={resetClick} />
    </div>
  )
}

const Seller = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [images, setImages] = useState<File[] | null>([])
  const { mutate: addProductMutation, isPending: loading } = useAddProduct()

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
        // const [err, data] = await to(addProduct(formData, token))
        // if (err) return toast.error(err.message)
        // toast.success(data.message)
        addProductMutation(formData, {
          onSuccess: () => {
            toast.success('Ürün başarıyla eklendi')
            formik.resetForm()
            setCoverImage(null)
            setImages([])
          },
          onError: error => toast.error(error.message)
        })
      } else {
        toast.error('Lütfen tüm alanları doldurunuz')
      }
    }
  })

  return (
    <section className='my-10 h-auto px-5 lg:px-20'>
      {loading && (
        <LoadingTemplete
          resetClick={() => {
            formik.resetForm()
            setCoverImage(null)
            setImages([])
          }}
        />
      )}
      <div className='flex size-full flex-col justify-around gap-10 md:flex-row'>
        {/* cover and another images */}
        <div className='flex size-full basis-2/5'>
          <ImageUpload
            setcoverImage={setCoverImage}
            setImages={setImages as React.Dispatch<React.SetStateAction<File[]>>}
            productImages={images}
            coverImage={coverImage}
          />
        </div>
        {/* product informations */}
        <div className='size-full basis-3/5'>
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
