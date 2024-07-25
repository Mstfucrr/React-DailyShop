import { useMutation, useQuery } from '@tanstack/react-query'
import { addCategory, updateCategoryById, deleteCategoryById } from './category.service'
import { ICategoryRequest } from '../types'
import reactQueryConfig from '@/configs/react-query-config'

/*

export const addCategory = async (val: ICategoryRequest) =>
  await privateAxiosInstance.post<any>(`Admin/Categories/Add`, val)

export const updateCategoryById = async (id: number, val: ICategoryRequest) =>
  await privateAxiosInstance.put<any>(`Admin/Categories/${id}`, val)

export const deleteCategoryById = async (id: number) => await privateAxiosInstance.delete<any>(`Admin/Categories/${id}`)

*/

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
