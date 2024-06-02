import { ICategory } from '@/shared/types'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

type Props = {
  updateCategoryFormik: any
  updateCategory: ICategory
}

const UpdateCategory = ({ updateCategory, updateCategoryFormik }: Props) => {
  return (
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
  )
}

export default UpdateCategory
