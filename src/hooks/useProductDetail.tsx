import { useEffect, useRef, useState } from 'react'
import { Messages } from 'primereact/messages'
import { setProductCookie } from '@/helper/cookieUtils'
import { IaddToCartRequest } from '@/services/order/types'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import { useGetProductById } from '@/services/product/use-product-service'
import { useAddToCart } from '@/services/order/use-cart-service'
import AddToCartSuccessTemplete from '@/components/ProductDetail/AddToCartSuccessMessage'

export const useProductDetail = (productId: number) => {
  const [images, setImages] = useState<{ source: string }[] | string | undefined>(undefined)

  const [selectSize, setSelectSize] = useState<string | undefined>(undefined)
  const [selectColor, setSelectColor] = useState<string | undefined>(undefined)
  // const size = [{ name: "S", key: "s" }]
  const [quantity, setQuantity] = useState(1)
  const msgs = useRef<Messages>(null)
  const [sizes, setSizes] = useState<{ name: string; key: string }[] | undefined>(undefined)
  const [colors, setColors] = useState<{ name: string; key: string }[] | undefined>(undefined)
  const [isUpdate, setIsUpdate] = useState(false)

  const { data: product, isPending: productLoading, error } = useGetProductById(productId)

  const { mutate: addToCart, isPending: addCartLoading } = useAddToCart()

  const { auth, isAuthorized } = useAuth()

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

  useEffect(() => {
    if (!productId) return
    if (error) {
      msgs.current?.clear()
      msgs.current?.show([
        {
          sticky: true,
          severity: 'error',
          summary: 'Hata',
          detail: error.message,
          closable: false
        }
      ])
      return
    }
    if (product) {
      setSizes(
        product.sizes?.map((size: string) => ({
          name: size,
          key: size
        }))
      )
      setColors(
        product.colors?.map((color: string) => ({
          name: color,
          key: color
        }))
      )
      const imagesSources: string[] = []
      product.images?.forEach((image: string) => {
        return imagesSources.push(image)
      })
      if (product.image) imagesSources.push(product.image)
      setImages(imagesSources.map((source: string) => ({ source: source })))
    }
  }, [productId, product, error])

  const handleAddToCart = async () => {
    if (!product) return
    if (!isAuthorized) return toast.error('Lütfen giriş yapınız')

    if ((sizes && sizes?.length > 0 && !selectSize) || (colors && colors?.length > 0 && !selectColor))
      return toast.error('Lütfen renk ve beden seçiniz')

    const cartAdd: IaddToCartRequest = {
      quantity: quantity,
      size: selectSize,
      color: selectColor
    }
    addToCart(
      { productId: product.id, input: cartAdd },
      {
        onSuccess: data =>
          toast.success(<AddToCartSuccessTemplete product={product} quantity={quantity} message={data.data.message} />),
        onError: err => toast.error(err.message)
      }
    )
  }

  return {
    images,
    selectSize,
    setSelectSize,
    selectColor,
    setSelectColor,
    quantity,
    setQuantity,
    msgs,
    sizes,
    colors,
    isUpdate,
    setIsUpdate,
    product,
    productLoading,
    error,
    addCartLoading,
    handleAddToCart,
    isAuthorized,
    authId: auth.id
  }
}
