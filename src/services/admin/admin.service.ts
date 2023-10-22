import axios from "axios";
import { makeRequest } from "../base/base";

// tek fetch fonksiyonu ile çek
const fetchSettings = async (token: string) => {
    const { data } = await axios.get('/admin/settings', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

const fetchUsers = async (token: string) => {
    const { data } = await axios.get('/admin/users', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

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



const saveAbout = async (input: string, token: string) => {

    const { data } = await axios.post('/admin/about', input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data;


}

const saveContact = async (email: string, phone: string, token: string) => {

    const { data } = await axios.post('/admin/contact', { email, phone }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}

const saveAddress = async (input: string, token: string) => {

    const { data } = await axios.post('/admin/address', input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}

const saveSiteIcon = async (input: File, token: string) => {

    const { data } = await axios.post('/admin/site-icon', input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

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
    await makeRequest<any>(`admin/users/${id}`, "PUT", null, token);

const getAllProducts = async (token: string) => 
    await makeRequest<any>(`admin/products`, "GET", null, token);

const getAllCategories = async (token: string) => 
    await makeRequest<any>(`admin/categories`, "GET", null, token);

const addCategory = async (token: string, val : any) => 
    await makeRequest<any>(`admin/categories`, "POST", val, token);

const updateCategoryById = async (id: number, val: any, token: string) => 
    await makeRequest<any>(`admin/categories/${id}`, "PUT", val, token);

export default {
    saveAbout,
    saveContact,
    saveAddress,
    saveSiteIcon,
    fetchSettings,
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
    updateCategoryById
}
