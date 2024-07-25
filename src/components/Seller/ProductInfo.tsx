import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { TreeSelect, TreeSelectChangeEvent } from 'primereact/treeselect'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { useCallback, useEffect, useState } from 'react'
import { convertCategoriesToTreeSelectModel, findCategoryByKeyInTreeSelectModel } from '../../utils/categoryTreeModel'
import { TreeNode } from 'primereact/treenode'
import { MultiSelect } from 'primereact/multiselect'
import { Editor, EditorTextChangeEvent } from 'primereact/editor'
import { Button } from 'primereact/button'
import { ICategory } from '@/shared/types'
import { useGetCategories } from '@/services/category/category.service'
import { IProductInfo } from '@/services/product/types'
import { ProgressSpinner } from 'primereact/progressspinner'
import { colors, productStatus, sizes } from '@/shared/constants'
import toast from 'react-hot-toast'
import GetQuote from '@/services/ai/get_quote.service'

type Props = {
  productInfo: IProductInfo
  setProductInfo: React.Dispatch<React.SetStateAction<IProductInfo>>
  formik: any
  loading: boolean
}

const ProductInfo = ({ formik, setProductInfo, productInfo, loading }: Props) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<ICategory>()
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(undefined)
  const [selectedSizes, setSelectedSizes] = useState<string[] | undefined>([])
  const [priceQuated, setPriceQuated] = useState<{ min: number; max: number } | undefined>(undefined)

  const colorTemplete = (option: any) => {
    return (
      <div className='align-items-center flex'>
        <div className='mr-2 h-5 w-6 rounded-lg' style={{ backgroundColor: option.value }}></div>
        <div>{option.label}</div>
      </div>
    )
  }

  const { data, isError, error } = useGetCategories()

  const showErrorMessage = (err: string) => toast.error(err)

  const showSuccessMessage = (msg: string) => toast.success(msg)

  useEffect(() => {
    if (isError) {
      showErrorMessage(error.message)
      return
    }
    if (data) setTreeNodes(convertCategoriesToTreeSelectModel(data.data))
  }, [data])

  useEffect(() => {
    if (treeNodes && selectedNodeKey)
      setSelectedCategory(findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey))
    console.log('treeNodes', treeNodes)
  }, [selectedCategory, selectedNodeKey, treeNodes])

  const { mutate: GetQuatedPrice, isPending: getPriceQuatedLoading } = GetQuote()

  const handleGetQuatedPrice = useCallback(async () => {
    if (!selectedCategory?.id) return

    const input = {
      category: selectedCategory?.id ?? 0,
      status: formik.values.status
    }

    GetQuatedPrice(input, {
      onSuccess: data => {
        showSuccessMessage(data.message)
        setPriceQuated(data.data)
      },
      onError: err => showErrorMessage(err.message)
    })
  }, [formik.values, showErrorMessage, showSuccessMessage])

  const showFormErrorMessage = (err: string) => {
    return <small className='p-error mb-6 block h-0'> {err} </small>
  }

  return (
    <div className='flex h-auto flex-col gap-y-7'>
      <h2 className='mb-5 text-4xl font-semibold'>Ürün Bilgileri</h2>
      <form className='flex flex-col gap-y-4' onSubmit={formik.handleSubmit}>
        {/* category */}
        <span className='p-float-label'>
          <TreeSelect
            id='ts-category'
            name='ts-category'
            className={`w-full md:w-56 ${formik.touched.category && formik.errors.category ? 'p-invalid' : ''}`}
            value={formik.values.category}
            options={treeNodes}
            onChange={(e: TreeSelectChangeEvent) => {
              formik.setFieldValue('category', e.value)
              setSelectedNodeKey(e.value as string)
            }}
            filter
          />
          <label htmlFor='ts-category'>Bir Kategori Seç</label>

          {formik.touched.category && showFormErrorMessage(formik.errors.category)}
        </span>

        {/* product name and pierce */}
        <div className='flex w-full flex-row flex-wrap gap-5'>
          <div className='w-full md:w-1/2'>
            <label htmlFor='name' className='mb-2 block font-bold'>
              Ürün Adı
            </label>
            <InputText
              id='name'
              name='name'
              className={`w-full ${formik.touched.name && formik.errors.name ? 'p-invalid' : ''}`}
              value={formik.values.name}
              onChange={e => formik.setFieldValue('name', e.target.value)}
            />
            {formik.touched.name && showFormErrorMessage(formik.errors.name)}
          </div>
          <div className='flex w-full flex-col gap-x-3 md:w-1/2'>
            <label htmlFor='in-product-price' className='mb-2 block font-bold'>
              Fiyatı
            </label>
            <InputNumber
              id='in-product-price'
              name='in-product-price'
              mode='currency'
              currency='TRY'
              locale='de-DE'
              minFractionDigits={2}
              className={`mb-2 w-full ${formik.touched.price && formik.errors.price ? 'p-invalid' : ''}`}
              onChange={e => formik.setFieldValue('price', e.value as any)}
              value={formik.values.price}
            />
            {formik.touched.price && showFormErrorMessage(formik.errors.price)}

            {/* fiyat önerisi getir */}
            <div className='flex flex-row flex-wrap items-center gap-x-2'>
              <Button
                label='Fiyat Önerisi Al'
                className='w-44 !text-sm'
                type='button'
                onClick={handleGetQuatedPrice}
                disabled={getPriceQuatedLoading}
              />

              {getPriceQuatedLoading ? (
                <ProgressSpinner strokeWidth='3.5' className='!w-10' />
              ) : (
                priceQuated && (
                  <span
                    className={`text-sm font-medium ${
                      priceQuated.min > formik.values.price || priceQuated.max < formik.values.price
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    Ürün için önerilen fiyat aralığı: [{priceQuated.min} - {priceQuated.max}]
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* colors and sizes (multi) */}
        <div className='flex w-full flex-row flex-wrap gap-x-5'>
          <div className='w-full md:w-1/3'>
            <label htmlFor='dd-colors' className='mb-2 block font-bold'>
              Renkler
            </label>
            <MultiSelect
              id='dd-colors'
              name='dd-colors'
              options={colors}
              value={formik.values.colors}
              onChange={(e: DropdownChangeEvent) => formik.setFieldValue('colors', e.value)}
              itemTemplate={colorTemplete}
              className={`w-full ${formik.touched.colors && formik.errors.colors ? 'p-invalid' : ''}`}
            />
            {formik.touched.colors && showFormErrorMessage(formik.errors.colors)}
          </div>
          <div className='w-full md:w-1/3'>
            <label htmlFor='dd-sizes' className='mb-2 block font-bold'>
              Bedenler
            </label>
            <MultiSelect
              id='dd-sizes'
              name='dd-sizes'
              className='w-full '
              options={sizes}
              value={selectedSizes}
              onChange={(e: DropdownChangeEvent) => setSelectedSizes(e.value)}
            />
          </div>
        </div>

        {/* bilgiler ( durum, stok adet) */}
        <div className='flex w-full flex-row flex-wrap gap-x-5'>
          <div className='w-full md:w-1/3'>
            <label htmlFor='dd-status' className='mb-2 block font-bold'>
              Durum
            </label>
            <Dropdown
              id='dd-status'
              name='dd-status'
              options={productStatus}
              onChange={(e: DropdownChangeEvent) => {
                formik.setFieldValue('status', e.value)
              }}
              value={formik.values.status}
              className={`w-full ${formik.touched.status && formik.errors.status ? 'p-invalid' : ''}`}
            />

            {formik.touched.status && showFormErrorMessage(formik.errors.status)}
          </div>

          <div className='w-full md:w-1/3'>
            <label htmlFor='in-stock' className='mb-2 block font-bold'>
              Stok Adedi
            </label>
            <InputNumber
              id='in-stock'
              name='in-stock'
              min={1}
              onChange={e => formik.setFieldValue('stock', e.value as any)}
              className={`w-full ${formik.touched.stock && formik.errors.stock ? 'p-invalid' : ''}`}
              value={formik.values.stock}
            />
          </div>
        </div>

        {/* description */}
        <div className='mt-5 flex w-full '>
          <div className='card mx-auto w-full'>
            <label htmlFor='ed-description' className='mb-2 block font-bold'>
              Açıklama
            </label>
            <Editor
              value={formik.values.description}
              onTextChange={(e: EditorTextChangeEvent) => formik.setFieldValue('description', e.htmlValue as any)}
              style={{ height: '300px' }}
              id='ed-description'
              name='ed-description'
              className={`w-full ${
                formik.touched.description && formik.errors.description ? 'border border-red-500' : ''
              }`}
            />

            {formik.touched.description && showFormErrorMessage(formik.errors.description)}
          </div>
        </div>

        {/* SUBMİT */}

        <Button
          className='!mt-7 w-1/3 text-white'
          type='submit'
          disabled={loading}
          text={loading}
          severity='help'
          onClick={() => {
            setProductInfo({
              ...productInfo,
              price: formik.values.price,
              stock: formik.values.stock,
              status: formik.values.status,
              description: formik.values.description,
              colors: formik.values.colors,
              sizes: selectedSizes,
              categoryId: selectedCategory?.id ?? 0,
              name: formik.values.name
            })
          }}
        >
          {loading ? (
            <div className='flex max-h-10 w-1/2 items-center gap-x-2'>
              <ProgressSpinner className='!w-16' strokeWidth='3.5' />
              <span>Kaydediliyor...</span>
            </div>
          ) : (
            <span className='w-full text-center'>Kaydet</span>
          )}
        </Button>
      </form>
    </div>
  )
}

/*
 for text editör showing 

<div className="ql-snow">
    <div className="ql-editor">
        <ol>Test</ol>
    </div>
</div>

*/

export default ProductInfo
