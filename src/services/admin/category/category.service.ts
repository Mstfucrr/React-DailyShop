import { privateAxiosInstance } from '../../base/base'
import { fetchCategories } from '@/services/category/category.service'
import { ICategoryRequest } from '../types'

// CATEGORIES (FETH , ADD, UPDATE, DELETE)
export const getAllCategories = fetchCategories

export const addCategory = async (val: ICategoryRequest) =>
  await privateAxiosInstance.post<any>(`Admin/Categories/Add`, val)

export const updateCategoryById = async (id: number, val: ICategoryRequest) =>
  await privateAxiosInstance.put<any>(`Admin/Categories/${id}`, val)

export const deleteCategoryById = async (id: number) => await privateAxiosInstance.delete<any>(`Admin/Categories/${id}`)
