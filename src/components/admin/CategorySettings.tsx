import { categoryService } from '@/services/admin/admin.service'
import { ICategory } from '@/shared/types'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { TreeSelect } from 'primereact/treeselect'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findCategoryByKeyInTreeSelectModel, convertCategoriesToTreeSelectModel } from '../../utils/categoryTreeModel'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IToast } from '@/store/Toast/type'
import { SET_TOAST } from '@/store/Toast'
import { Tree } from 'primereact/tree'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { ICategoryRequest } from '@/services/admin/types'
import NodeTemplate from './NodeTemplate'
import { ProgressSpinner } from 'primereact/progressspinner'

const CategorySettings = () => {
  const [treeNodes, setTreeNodes] = useState<any>(null)
  const [selectedNodeKey, setSelectedNodeKey] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [updateCategoryActive, setUpdateCategoryActive] = useState<boolean>(false)
  const [updateCategory, setUpdateCategory] = useState<ICategory | null>(null)

  const { token } = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (treeNodes && selectedNodeKey)
      setSelectedCategory(findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey))
  }, [selectedCategory, selectedNodeKey])

  useEffect(() => {
    const getAllCategories = async () => {
      await handleGetAllCategories()
    }
    getAllCategories()
  }, [])

  const showErrorMessage = (err: Error) => {
    const toast: IToast = {
      severity: 'error',
      summary: 'Hata',
      detail: err.message,
      life: 3000
    }
    dispatch(SET_TOAST(toast))
  }
  const showSuccess = (message: string) => {
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: message,
      life: 3000
    }
    dispatch(SET_TOAST(toast))
  }

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required('Kategori adı boş olamaz')
      .min(2, 'Kategori adı en az 2 karakter olmalıdır')
      .max(50, 'Kategori adı en fazla 50 karakter olmalıdır')
  })

  const handleAddCategory = async (val: ICategoryRequest) => {
    const [err, data] = await to(categoryService.addCategory(val, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
    handleGetAllCategories()
    formik.resetForm()
  }

  const handleGetAllCategories = async () => {
    const [err, data] = await to(categoryService.getAllCategories())
    console.log(data)
    if (err) return showErrorMessage(err)
    setSelectedNodeKey(null)
    setSelectedCategory(undefined)
    setUpdateCategory(null)
    setTreeNodes(convertCategoriesToTreeSelectModel(data))
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      categoryName: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      setLoading(true)
      const val: ICategoryRequest = {
        name: values.categoryName,
        parentCategoryId: selectedCategory?.id ?? null
      }
      await handleAddCategory(val)
      setLoading(false)
    }
  })

  // update selec category

  const handleUpdateCategory = async (id: number, val: any) => {
    console.log(val)
    const [err, data] = await to(categoryService.updateCategoryById(id, val, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
    handleGetAllCategories()
    updateCategoryFormik.resetForm()
  }

  const updateCategoryValidationSchema = Yup.object({
    categoryName: Yup.string()
      .required('Kategori adı boş olamaz')
      .min(2, 'Kategori adı en az 2 karakter olmalıdır')
      .max(50, 'Kategori adı en fazla 50 karakter olmalıdır')
  })

  const updateCategoryFormik = useFormik({
    initialValues: {
      categoryName: updateCategory?.name ?? ''
    },
    validationSchema: updateCategoryValidationSchema,
    onSubmit: async values => {
      setLoading(true)
      const val: ICategoryRequest = {
        name: values.categoryName,
        parentCategoryId: updateCategory?.parentCategoryId ?? null
      }
      if (updateCategory) await handleUpdateCategory(updateCategory?.id, val)
      setLoading(false)
    }
  })

  const handleDeleteCategory = async (id: number) => {
    const [err, data] = await to(categoryService.deleteCategoryById(id, token))
    if (err) return showErrorMessage(err)
    showSuccess(data.message)
    handleGetAllCategories()
    updateCategoryFormik.resetForm()
    setLoading(false)
  }

  const renderNodeTemplate = (node: any) => (
    <NodeTemplate node={node} setUpdateCategory={setUpdateCategory} handleDeleteCategory={handleDeleteCategory} />
  )

  return (
    <>
      {loading && (
        <div className='flex h-full w-full items-center justify-center'>
          <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth='8' animationDuration='.9s' />
        </div>
      )}
      <div className='flex w-full flex-col gap-4'>
        <h1 className='mb-3 text-4xl'>Kategori İşlemleri</h1>
        <div className='w-full text-center'>
          <Button
            className='p-button-rounded p-button-info w-full sm:w-64'
            icon='pi pi-pencil'
            onClick={() => {
              setUpdateCategoryActive(!updateCategoryActive)
            }}
            label={updateCategoryActive ? 'Düzenlemeyi Kapat' : 'Kategorileri Düzenle'}
          />
        </div>
        {!updateCategoryActive && (
          <>
            <h2 className='text-2xl font-semibold'>Kategori Ekle</h2>
            <span className='text-sm text-gray-500'>
              Eğer üst kategori seçilmezse kategori kök kategori olarak eklenecektir.
            </span>
          </>
        )}

        <div className='flex w-full flex-col gap-4'>
          {/* Üst Kategori seçimi */}
          {!updateCategoryActive && (
            <>
              <div className='flex w-full flex-col gap-4'>
                {treeNodes && (
                  <div className='flex flex-row flex-wrap gap-2'>
                    <TreeSelect
                      value={selectedNodeKey}
                      options={treeNodes}
                      onChange={e => setSelectedNodeKey(e.value)}
                      filter
                      filterBy='label'
                      placeholder='Üst Kategori Seç'
                      className='w-full md:w-1/2'
                    />
                    <Button
                      onClick={() => {
                        setSelectedCategory(undefined)
                        setSelectedNodeKey(null)
                      }}
                      icon='pi pi-times'
                      className='p-button-danger'
                      disabled={!selectedNodeKey}
                    />
                    {/* <Button className='p-button-rounded p-button-danger' label='Seçili Kategoriyi Sil' icon="pi pi-trash" /> */}
                  </div>
                )}
              </div>

              {/* Kategori adı */}

              <InputText
                placeholder='Yeni Kategori Adı*'
                className={
                  formik.touched.categoryName && formik.errors.categoryName
                    ? 'p-invalid w-full md:w-1/2'
                    : 'w-full md:w-1/2'
                }
                id='categoryName'
                name='categoryName'
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <small id='categoryName-help' className='p-error p-d-block'>
                  {formik.errors.categoryName}
                </small>
              ) : null}

              <Button
                label='Ekle'
                className='p-button-success max-w-xs'
                onClick={() => formik.handleSubmit()}
                type='submit'
              />
            </>
          )}
        </div>

        {/* seçili kategoryi düzenle */}
        {updateCategoryActive && (
          <div className='flex w-full flex-wrap justify-evenly'>
            <Tree
              className='w-full max-w-xl'
              value={treeNodes}
              selectionMode='single'
              selectionKeys={selectedNodeKey}
              onSelectionChange={e => setSelectedNodeKey(e.value)}
              dragdropScope='demo'
              onDragDrop={e => {
                setLoading(true)
                handleUpdateCategory(e.dragNode.data.id, {
                  name: e.dragNode.data.name,
                  parentCategoryId: e.dropNode?.data.id || null
                })
                setLoading(false)
              }}
              nodeTemplate={renderNodeTemplate}
            />
            <ConfirmDialog />
            {updateCategory && (
              <div className='flex flex-col gap-3'>
                <h3 className='text-2xl font-semibold'>{updateCategory?.name} düzenleniyor</h3>

                <InputText
                  placeholder='Yeni Kategori Adı*'
                  className={
                    updateCategoryFormik.touched.categoryName && updateCategoryFormik.errors.categoryName
                      ? 'p-invalid w-full'
                      : 'w-full'
                  }
                  id='categoryName'
                  name='categoryName'
                  value={updateCategoryFormik.values.categoryName}
                  onChange={updateCategoryFormik.handleChange}
                  onBlur={updateCategoryFormik.handleBlur}
                />

                {updateCategoryFormik.touched.categoryName && updateCategoryFormik.errors.categoryName ? (
                  <small id='categoryName-help' className='p-error p-d-block'>
                    {updateCategoryFormik.errors.categoryName}
                  </small>
                ) : null}

                <Button
                  label='Güncelle'
                  className='p-button-help max-w-xs'
                  onClick={() => updateCategoryFormik.handleSubmit()}
                  type='submit'
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default CategorySettings
