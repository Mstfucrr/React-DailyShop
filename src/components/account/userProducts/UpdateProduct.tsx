import { useGetCategories } from '@/services/category/category.service'
import { useGetProductById, useUpdateProduct } from '@/services/product/use-product-service'
import { colors, productStatus, sizes } from '@/shared/constants'
import { ICategory, IProduct } from '@/shared/types'
import { productInfoValidationSchema } from '@/shared/validationSchemas'
import { convertCategoriesToTreeSelectModel, findCategoryByKeyInTreeSelectModel } from '@/utils/categoryTreeModel'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Editor, EditorTextChangeEvent } from 'primereact/editor'
import { Fieldset } from 'primereact/fieldset'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import { ProgressSpinner } from 'primereact/progressspinner'
import { TreeNode } from 'primereact/treenode'
import { TreeSelect, TreeSelectChangeEvent } from 'primereact/treeselect'
import { classNames } from 'primereact/utils'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'

type Props = {
  productUpdateId: number | null
  setIsUpdate: (isUpdate: boolean) => void
}

const UpdateProduct = ({ productUpdateId, setIsUpdate }: Props) => {
  const [product, setProduct] = useState<IProduct | null>(null)
  const [productCoverImage, setProductCoverImage] = useState<string | File | null>(null)
  const [productImages, setProductImages] = useState<any[]>([])
  const [treeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<ICategory>()
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(product?.categoryId?.toString())

  const { data: productData, error: productError } = useGetProductById(productUpdateId as number)

  const { data: categoryData, error: categoryError } = useGetCategories()

  const { mutate: updateProduct } = useUpdateProduct()

  const fetchProduct = useCallback(async () => {
    if (productUpdateId == null) return setProduct(null)

    if (productError) {
      toast.error(productError.message)
      setProduct(null)
      setIsUpdate(false)
      return
    }
    if (productData == null) return
    if (productData.image) setProductCoverImage(productData.image)
    setProduct(productData)
    setProductImages(productData.images || [])
    setSelectedNodeKey(productData.category?.id?.toString())
    setSelectedCategory(productData.category)
  }, [productData, productError, productUpdateId, setIsUpdate])

  const getCategories = useCallback(() => {
    if (categoryError) return toast.error(categoryError.message)
    const data = categoryData?.data
    if (data) setTreeNodes(convertCategoriesToTreeSelectModel(data))
  }, [categoryData, categoryError])

  useEffect(() => {
    if (treeNodes && selectedNodeKey)
      setSelectedCategory(findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey))
  }, [selectedCategory, selectedNodeKey, treeNodes])

  useEffect(() => {
    setProduct(null)
    fetchProduct().then(getCategories)
  }, [fetchProduct, productUpdateId, getCategories])

  const handleCoverImage = (e: any) => {
    if (e.target.files == null) return
    setProductCoverImage(e.target.files[0])
  }

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return
    if (e.target.files.length === 0) return
    // aynı dosya varsa hata ver
    for (const file of Array.from(e.target.files)) {
      if (productImages.find(img => img.name === file.name)) {
        toast.error('Aynı dosya zaten ekli')
        return
      }
    }
    const files = Array.from(e.target.files)
    setProductImages([...productImages, ...files])
  }

  const handleRemoveImage = (image: File | string) => {
    if (typeof image === 'string') {
      setProductImages(productImages.filter(img => img !== image))
      return
    }
    setProductImages(productImages.filter(img => img !== image))
  }

  const hanldeSubmit = async (values: any) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('price', values.price)
    formData.append('status', values.status)
    formData.append('stock', values.stock)
    formData.append('categoryId', values.category?.id)
    if (productCoverImage != null) formData.append('BodyImage', productCoverImage)
    if (productImages != null)
      productImages.forEach(img => {
        formData.append(typeof img === 'string' ? 'ProductImages' : 'ProductImagesFile', img)
      })
    values.colors?.forEach((color: string) => formData.append('Colors', color))
    values.sizes?.forEach((size: string) => formData.append('Sizes', size))

    updateProduct(
      { id: productUpdateId as number, input: formData },
      {
        onSuccess: data => {
          toast.success(data.data.message)
          setIsUpdate(false)
        },
        onError: err => toast.error(err.message)
      }
    )
  }

  return (
    <motion.div
      className='fixed left-0 top-0 z-10 flex h-full  min-h-[800px] w-full items-center justify-center bg-primaryDark bg-opacity-10'
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{
        duration: 0.4,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      <div className='flex h-full w-full flex-col rounded-lg bg-white p-5 shadow-2xl md:h-3/4 md:w-2/3'>
        <div className='w-full pr-6 pt-6 text-right'>
          <button onClick={() => setIsUpdate(false)} className='text-2xl text-primaryDark'>
            <FaTimes />
          </button>
        </div>
        {(product == null || selectedNodeKey == undefined) && <ProgressSpinner className='!w-full text-center' />}
        {product != null && selectedNodeKey != undefined && (
          <div className='flex h-full w-full flex-col overflow-y-auto'>
            <div className='text-center'>
              <h3 className='my-4 text-4xl text-primaryDark'>Ürün Düzenle - {product?.name}</h3>
            </div>
            <Formik initialValues={product} validationSchema={productInfoValidationSchema} onSubmit={hanldeSubmit}>
              {({ values, errors, touched, handleChange, handleBlur, handleReset, dirty }) => (
                <Form className='flex flex-col gap-4 sm:px-4'>
                  {/* Ürün Adı ve Resim */}
                  <div className='flex flex-col gap-2 '>
                    <label htmlFor='name'>Ürün Adı</label>
                    <InputText
                      name='name'
                      id='name'
                      className={classNames({ 'p-invalid': errors.name })}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && <div className='text-red-500'>{String(errors.name)}</div>}

                    <Fieldset legend='Ürün Resmleri' className='w-full' toggleable>
                      <>
                        {productCoverImage != null && (
                          <div className='relative flex h-80 justify-center'>
                            <img
                              src={
                                typeof productCoverImage == 'string'
                                  ? productCoverImage
                                  : URL.createObjectURL(productCoverImage)
                              }
                              alt={productCoverImage as any}
                              className='h-auto w-[350px] object-contain'
                            />
                            <div
                              className='absolute top-2/3 mt-20 transform rounded-full
                                            border border-dashed border-green-500 bg-white bg-opacity-60 transition-all
                                            duration-300  ease-in-out hover:scale-110 hover:bg-opacity-80
                                        '
                            >
                              <Button
                                icon='pi pi-upload'
                                severity='success'
                                rounded
                                text={true}
                                className='h-full w-full'
                                onClick={() => {
                                  const input = document.createElement('input')
                                  input.type = 'file'
                                  input.accept = 'image/*'
                                  input.onchange = handleCoverImage
                                  input.click()
                                }}
                              >
                                <div className='px-5'>Resim Değiştir</div>
                              </Button>
                            </div>
                          </div>
                        )}

                        {productImages != null && (
                          <div className='mt-10 flex w-full flex-row flex-wrap gap-4'>
                            {productImages.map(image => (
                              <div
                                className='relative flex h-auto w-[300px] justify-end rounded-3xl border border-dashed border-blue-600'
                                key={typeof image == 'string' ? image : image.name}
                              >
                                <FaTimes
                                  className='absolute right-3 top-3 float-right cursor-pointer text-2xl text-red-400'
                                  onClick={() => {
                                    handleRemoveImage(image)
                                  }}
                                />
                                <img
                                  src={typeof image == 'string' ? image : URL.createObjectURL(image)}
                                  alt='resim'
                                  className=' object-contain p-2 '
                                />
                              </div>
                            ))}

                            <button
                              className='h-auto w-[300px] transform rounded-3xl border border-dashed border-blue-600 bg-opacity-10
                                                text-2xl text-blue-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 hover:text-white'
                              onClick={() => {
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.accept = 'image/*'
                                input.multiple = true
                                input.click()
                                input.onchange = e => {
                                  handleAddImage(e as any)
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </>
                    </Fieldset>
                  </div>
                  {/* Kategori ve Fiyat */}
                  <div className='flex w-full flex-col gap-4 p-4 md:w-5/6'>
                    <span className='p-float-label'>
                      {product.category?.id != null && selectedNodeKey != undefined && (
                        <>
                          <TreeSelect
                            id='ts-category'
                            name='ts-category'
                            value={selectedNodeKey}
                            options={treeNodes}
                            onChange={(e: TreeSelectChangeEvent) => {
                              handleChange({
                                target: {
                                  name: 'category',
                                  value: findCategoryByKeyInTreeSelectModel(treeNodes as TreeNode[], e.value as string)
                                }
                              })
                              setSelectedNodeKey(e.value as string)
                              setSelectedCategory(
                                findCategoryByKeyInTreeSelectModel(treeNodes as TreeNode[], e.value as string)
                              )
                            }}
                            className={classNames({ 'p-invalid': errors.categoryId }) + ' w-auto'}
                            placeholder='Bir Kategori Seç'
                          />

                          {touched.categoryId && errors.categoryId && (
                            <div className='text-red-500'>{String(errors.categoryId)}</div>
                          )}
                        </>
                      )}
                    </span>

                    {/* Fiyat */}
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='price'>Fiyat</label>
                      <InputNumber
                        name='price'
                        id='price'
                        className={classNames({ 'p-invalid': errors.price })}
                        value={values.price}
                        onChange={e => {
                          handleChange({
                            target: { name: 'price', value: e.value }
                          })
                        }}
                        onBlur={handleBlur}
                        mode='currency'
                        currency='TRY'
                      />
                      {errors.price && touched.price && <div className='text-red-500'>{String(errors.price)}</div>}
                    </div>

                    {/* Bedenler, Renkler, Durum ve stok */}
                    <div className='mt-6 flex gap-4 p-5'>
                      <div className='flex flex-col'>
                        <label htmlFor='sizes'>Bedenler</label>
                        <MultiSelect
                          name='sizes'
                          id='sizes'
                          className='w-full'
                          value={values.sizes}
                          options={sizes}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor='colors'>Renkler</label>
                        <MultiSelect
                          name='colors'
                          id='colors'
                          className={classNames({ 'p-invalid': errors.colors })}
                          value={values.colors}
                          options={colors}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.colors && touched.colors && <div className='text-red-500'>{String(errors.colors)}</div>}
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor='status'>Durum</label>
                        <Dropdown
                          name='status'
                          id='status'
                          className={classNames({ 'p-invalid': errors.status })}
                          value={values.status}
                          options={productStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.status && touched.status && <div className='text-red-500'>{String(errors.status)}</div>}
                      </div>
                      {/* stok adeti */}
                      <div className='flex flex-col'>
                        <label htmlFor='stock'>Stok</label>
                        <InputNumber
                          name='stock'
                          id='stock'
                          className={classNames({ 'p-invalid': errors.stock })}
                          value={values.stock}
                          onChange={e => {
                            handleChange({
                              target: { name: 'stock', value: e.value }
                            })
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.stock && touched.stock && <div className='text-red-500'>{String(errors.stock)}</div>}
                      </div>
                    </div>

                    {/* Açıklama */}
                    <div className='flex flex-col gap-2'>
                      <Fieldset legend='Açıklama' className='w-full' toggleable>
                        <Editor
                          name='ed-description'
                          id='ed-description'
                          className={classNames({
                            'p-invalid': errors.description
                          })}
                          value={values.description}
                          onTextChange={(e: EditorTextChangeEvent) => {
                            handleChange({
                              target: {
                                name: 'description',
                                value: e.htmlValue as any
                              }
                            })
                          }}
                        />
                        {errors.description && touched.description && (
                          <div className='text-red-500'>{String(errors.description)}</div>
                        )}
                      </Fieldset>
                    </div>
                  </div>

                  {/* Kaydet ve Sıfırla Butonları */}
                  <div className='flex flex-row gap-3'>
                    <Button
                      type='submit'
                      label='Kaydet'
                      className='w-1/3 self-center'
                      disabled={!dirty}
                      onClick={() => hanldeSubmit(values)}
                    />
                    <Button onClick={() => handleReset} text>
                      Reset
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UpdateProduct
