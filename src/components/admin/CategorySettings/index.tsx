import { ICategory } from '@/shared/types'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { TreeSelect } from 'primereact/treeselect'
import { useEffect, useState } from 'react'
import { findCategoryByKeyInTreeSelectModel, convertCategoriesToTreeSelectModel } from '@/utils/categoryTreeModel'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Tree } from 'primereact/tree'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { ICategoryRequest } from '@/services/admin/types'
import NodeTemplate from './NodeTemplate'
import { ProgressSpinner } from 'primereact/progressspinner'
import toast from 'react-hot-toast'
import UpdateCategory from './update-category'
import { useAddCategory, useDeleteCategory, useUpdateCategory } from '@/services/admin/category/use-admin-category'
import { useGetCategories } from '@/services/category/category.service'

const CategorySettings = () => {
  const [treeNodes, setTreeNodes] = useState<any>(null)
  const [selectedNodeKey, setSelectedNodeKey] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined)
  const [updateCategoryActive, setUpdateCategoryActive] = useState<boolean>(false)
  const [updateCategory, setUpdateCategory] = useState<ICategory | null>(null)

  const { data: categoriesData, error: categoriesError } = useGetCategories()

  const { mutate: addCategory, isPending: isAddCategoryPendig } = useAddCategory()

  const { mutate: updateCategoryById, isPending: isUpdateCategoryPendig } = useUpdateCategory()

  const { mutate: deleteCategoryById, isPending: isDeleteategoryPendig } = useDeleteCategory()

  useEffect(() => {
    if (treeNodes && selectedNodeKey)
      setSelectedCategory(findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey))
  }, [selectedNodeKey, treeNodes])

  useEffect(() => {
    if (categoriesError) {
      toast.error(categoriesError.message)
      return
    }
    setSelectedNodeKey(null)
    setSelectedCategory(undefined)
    setUpdateCategory(null)
    setTreeNodes(convertCategoriesToTreeSelectModel(categoriesData?.data ?? []))
  }, [categoriesData, categoriesError])

  const showErrorMessage = (err: Error) => toast.error(err.message)
  const showSuccess = (message: string) => toast.success(message)

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required('Kategori adı boş olamaz')
      .min(2, 'Kategori adı en az 2 karakter olmalıdır')
      .max(50, 'Kategori adı en fazla 50 karakter olmalıdır')
  })

  const handleAddCategory = (val: ICategoryRequest) => {
    addCategory(val, {
      onSuccess: () => {
        showSuccess('Kategori başarıyla eklendi')
        formik.resetForm()
      },
      onError: (err: Error) => showErrorMessage(err)
    })
  }

  const formik = useFormik({
    initialValues: {
      categoryName: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const val: ICategoryRequest = {
        name: values.categoryName,
        parentCategoryId: selectedCategory?.id ?? null
      }
      handleAddCategory(val)
    }
  })

  const handleUpdateCategory = (id: number, val: any) => {
    updateCategoryById(
      { id, category: val },
      {
        onSuccess: () => {
          showSuccess('Kategori başarıyla güncellendi')
          updateCategoryFormik.resetForm()
        },
        onError: (err: Error) => showErrorMessage(err)
      }
    )
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
      const val: ICategoryRequest = {
        name: values.categoryName,
        parentCategoryId: updateCategory?.parentCategoryId ?? null
      }
      if (updateCategory) handleUpdateCategory(updateCategory?.id, val)
    }
  })

  const handleDeleteCategory = (id: number) => {
    deleteCategoryById(id, {
      onSuccess: () => {
        showSuccess('Kategori başarıyla silindi')
        updateCategoryFormik.resetForm()
      },
      onError: (err: Error) => showErrorMessage(err)
    })
  }

  const renderNodeTemplate = (node: any) => (
    <NodeTemplate node={node} setUpdateCategory={setUpdateCategory} handleDeleteCategory={handleDeleteCategory} />
  )

  return (
    <>
      {isAddCategoryPendig ||
        isUpdateCategoryPendig ||
        (isDeleteategoryPendig && (
          <div className='flex size-full items-center justify-center'>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth='8' animationDuration='.9s' />
          </div>
        ))}
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
                handleUpdateCategory(e.dragNode.data.id, {
                  name: e.dragNode.data.name,
                  parentCategoryId: e.dropNode?.data.id || null
                })
              }}
              nodeTemplate={renderNodeTemplate}
            />
            <ConfirmDialog />
            {updateCategory && (
              <UpdateCategory updateCategory={updateCategory} updateCategoryFormik={updateCategoryFormik} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default CategorySettings
