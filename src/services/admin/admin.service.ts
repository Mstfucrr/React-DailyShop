import axios from "axios";
import { makeRequest } from "../base/base";

// tek fetch fonksiyonu ile çek
const fetchSettings = async (token: string) => 
    await makeRequest<any>(`Admin/SiteSettings`, "GET", null, token);

const saveSettings = async (val: any, token: string) =>
    await makeRequest<any>(`Admin/SiteSettings`, "PUT", val, token);



const fetchUsers = async (token: string) =>
    await makeRequest<any>(`Admin/UserSettings/Index`, "GET", null, token);

const fetchAddressByUserId = async (id: number, token: string) => {
    const { data } = await axios.get(`/admin/users/${id}/addresses`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}

const fetchReviewsByUserId = async (id: number, token: string) => {
    const { data } = await axios.get(`/admin/users/${id}/reviews`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}


const updateReviewStatus = async (id: number, status: string, token: string) => {

    const { data } = await axios.post(`/admin/review/${id}`, { status }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}

const fetchPaddingProductByUserId = async (id: number, token: string) => {
    const { data } = await axios.get(`/admin/users/${id}/products`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}

const updateProductApprovalStatus = async (id: number, status: boolean, token: string) =>
    await makeRequest<any>(`admin/products/${id}`, "PUT", { status }, token);

const blockUser = async (id: number, token: string) =>
    await makeRequest<any>(`Admin/UserSettings/${id}`, "PUT", null, token);

const getAllProducts = async (token: string) =>
    await makeRequest<any>(`admin/products`, "GET", null, token);

const getAllCategories = async () =>
    await makeRequest<any>(`Categories/GetList`, "GET", null);

const addCategory = async (val: any, token: string) =>
    await makeRequest<any>(`Admin/Categories/Add`, "POST", val, token);

const updateCategoryById = async (id: number, val: any, token: string) =>
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
