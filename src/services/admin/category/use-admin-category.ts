import { useMutation } from '@tanstack/react-query'
import { addCategory, updateCategoryById, deleteCategoryById } from './category.service'
import { ICategoryRequest } from '../types'
import reactQueryConfig from '@/configs/react-query-config'

const useAddCategory = () =>
  useMutation({
    mutationKey: ['addCategory'],
    mutationFn: (category: ICategoryRequest) => addCategory(category),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['categories'] })
    }
  })

const useUpdateCategory = () =>
  useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: ({ id, category }: { id: number; category: ICategoryRequest }) => updateCategoryById(id, category),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['categories'] })
    }
  })

const useDeleteCategory = () =>
  useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: (id: number) => deleteCategoryById(id),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['categories'] })
    }
  })

export { useAddCategory, useUpdateCategory, useDeleteCategory }
