import { makeRequest } from "../base/base";
import { ICategoryRequest } from "./types";

// CATEGORIES (FETH , ADD, UPDATE, DELETE)
export const getAllCategories = async () =>
  await makeRequest<any>(`Categories/GetList`, "GET", null);

export const addCategory = async (val: ICategoryRequest, token: string) =>
  await makeRequest<any>(`Admin/Categories/Add`, "POST", val, token);

export const updateCategoryById = async (
  id: number,
  val: ICategoryRequest,
  token: string,
) => await makeRequest<any>(`Admin/Categories/${id}`, "PUT", val, token);

export const deleteCategoryById = async (id: number, token: string) =>
  await makeRequest<any>(`Admin/Categories/${id}`, "DELETE", null, token);
