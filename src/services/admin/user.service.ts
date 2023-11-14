import { makeRequest } from "../base/base";

// USERS
export const fetchUsers = async (token: string) =>
    await makeRequest<any>(`Admin/UserSettings/Index`, "GET", null, token);

// USER BLOK
export const blockUser = async (id: number, token: string) =>
    await makeRequest<any>(`Admin/UserSettings/${id}`, "PUT", null, token);

// USER ADDRESS
export const fetchAddressByUserId = async (id: number, token: string) =>
    await makeRequest(`Profiles/GetListAddressByUserId?id=${id}`, "GET", null, token);

// USER REVIEWS (FETH AND UPDATE)
export const fetchReviewsByUserId = async (id: number, token: string) =>
    await makeRequest(`/Reviews/GetListByUserId?UserId=${id}`, "GET", { status }, token);

export const updateReviewStatus = async (id: number, status: string, token: string) =>
    await makeRequest(`/admin/users/${id}/rewies`, "PUT", { status }, token);

// USER PRODUCTS (FETH AND UPDATE)
export const fetchPaddingProductByUserId = async (id: number, token: string) =>
    await makeRequest(`/Users/${id}/Products`, "GET", null, token);

export const updateProductApprovalStatus = async (id: number, status: boolean, token: string) =>
    await makeRequest<any>(`admin/products/${id}`, "PUT", { status }, token);
