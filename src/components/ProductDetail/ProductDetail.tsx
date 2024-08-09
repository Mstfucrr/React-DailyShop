'use client'
import { Galleria } from 'primereact/galleria'
import { Rating } from 'primereact/rating'
import { RadioButton } from 'primereact/radiobutton'
import { FaCommentAlt, FaInfoCircle, FaMinus, FaPencilAlt, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { MdDescription } from 'react-icons/md'
import { TabView, TabPanel } from 'primereact/tabview'
import { Messages } from 'primereact/messages'
import { InputNumber } from 'primereact/inputnumber'
import { ProgressSpinner } from 'primereact/progressspinner'
import UpdateProduct from '../account/userProducts/UpdateProduct'
import ProductReview from './productReview'
import { productStatus } from '@/shared/constants'
import { AnimatePresence } from 'framer-motion'
import { useProductDetail } from '@/hooks/useProductDetail'
import Image from 'next/image'

const ProductDetail = ({ productId }: { productId: number }) => {
  const {
    product,
    productLoading,
    images,
    sizes,
    colors,
    addCartLoading,
    handleAddToCart,
    selectSize,
    setSelectSize,
    selectColor,
    setSelectColor,
    quantity,
    setQuantity,
    isUpdate,
    setIsUpdate,
    msgs,
    isAuthorized,
    authId
  } = useProductDetail(productId)

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
                  item={(item: any) => (
                    <Image src={item.source} alt={item.alt} className='!w-full' width={500} height={500} />
                  )}
                  value={images as any}
                  thumbnail={item => (
                    <Image src={item.source} alt={item.alt} width={130} height={90} className='object-cover' />
                  )}
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
                {isAuthorized && authId == product?.userId && (
                  <button
                    className='text-primary transition-all duration-300 ease-in-out hover:text-primaryDark'
                    onClick={() => setIsUpdate(true)}
                  >
                    <FaPencilAlt className='mr-2 inline' />
                    Ürünü Düzenle
                  </button>
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
                {/* ( {reviews?.length} İzlenim ) */}
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
              {/* quantity */}
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

                  {/* <button
                    className='inline-block border-primary bg-primary px-3 py-2 leading-6 text-[#212529] transition-all duration-300 ease-in-out hover:bg-primaryDark hover:text-white'
                    onClick={() => handleAddFavorite(product.id)}
                  >
                    <FaHeart className='mr-3 inline' />
                    Favorilere Ekle
                  </button> */}
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
                  <ProductReview productId={product.id} productName={product.name} />
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
