import { makeRequest } from "../base/base";
import { ICategoryRequest, ISiteSettings } from "./types";

// SETTINGS
const fetchSettings = async (token: string) =>
    await makeRequest<any>(`Admin/SiteSettings`, "GET", null, token);

const saveSettings = async (val: ISiteSettings, token: string) =>
    await makeRequest<any>(`Admin/SiteSettings`, "PUT", val, token);

// USERS
const fetchUsers = async (token: string) =>
    await makeRequest<any>(`Admin/UserSettings/Index`, "GET", null, token);

// USER BLOK
const blockUser = async (id: number, token: string) =>
    await makeRequest<any>(`Admin/UserSettings/${id}`, "PUT", null, token);

// USER ADDRESS
const fetchAddressByUserId = async (id: number, token: string) =>
    await makeRequest(`/admin/users/${id}/addresses`, "GET", null, token);

// USER REVIEWS (FETH AND UPDATE)
const fetchReviewsByUserId = async (id: number, token: string) =>
    await makeRequest(`/admin/users/${id}/rewies`, "GET", { status }, token);

const updateReviewStatus = async (id: number, status: string, token: string) =>
    await makeRequest(`/admin/users/${id}/rewies`, "PUT", { status }, token);

// USER PRODUCTS (FETH AND UPDATE)
const fetchPaddingProductByUserId = async (id: number, token: string) =>
    await makeRequest(`/admin/users/${id}/products`, "GET", null, token);

const updateProductApprovalStatus = async (id: number, status: boolean, token: string) =>
    await makeRequest<any>(`admin/products/${id}`, "PUT", { status }, token);

// PRODUCTS
const getAllProducts = async (token: string) =>
    await makeRequest<any>(`Products`, "GET", null, token);

// CATEGORIES (FETH , ADD, UPDATE, DELETE)
const getAllCategories = async () =>
    await makeRequest<any>(`Categories/GetList`, "GET", null);

const addCategory = async (val: ICategoryRequest, token: string) =>
    await makeRequest<any>(`Admin/Categories/Add`, "POST", val, token);

const updateCategoryById = async (id: number, val: ICategoryRequest, token: string) =>
    await makeRequest<any>(`Admin/Categories/${id}`, "PUT", val, token);

const deleteCategoryById = async (id: number, token: string) =>
    await makeRequest<any>(`Admin/Categories/${id}`, "DELETE", null, token);

export default {
    fetchSettings,
    saveSettings,
    fetchUsers,
    fetchAddressByUserId,
    fetchReviewsByUserId,
    updateReviewStatus,
    fetchPaddingProductByUserId,
    updateProductApprovalStatus,
    blockUser,
    getAllProducts,
    getAllCategories,
    addCategory,
    updateCategoryById,
    deleteCategoryById
}
