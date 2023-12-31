import { makeRequest } from "../base/base";

// USERS
export const fetchUsers = async (token: string) =>
    await makeRequest<any>(`Admin/UserSettings/Index`, "GET", null, token);

// USER BLOK
export const blockUser = async (id: number, token: string) =>
    await makeRequest<any>(`Admin/UserSettings/${id}`, "PUT", null, token);

// USER ADDRESS
export const fetchAddressByUserId = async (id: number, token: string) =>
    await makeRequest<any>(`Profiles/GetListAddressByUserId?id=${id}`, "GET", null, token);

// USER REVIEWS (FETH AND UPDATE)
export const fetchReviewsByUserId = async (id: number, token: string) =>
    await makeRequest<any>(`/Reviews/GetListByUserId?UserId=${id}`, "GET", token);

export const updateReviewStatus = async (id: number, status: string, token: string) =>
    await makeRequest<any>(`/admin/users/UpdateReviewStatus/${id}?status=${status}`, "PUT", null, token);

// USER PRODUCTS (FETH AND UPDATE)
export const fetchPaddingProductByUserId = async (id: number, token: string) =>
    await makeRequest<any>(`/admin/Users/${id}/Products`, "GET", null, token);

export const updateProductApprovalStatus = async (id: number, IsApproved: boolean, token: string) =>
    await makeRequest<any>(`/Admin/Products/UpdateStatus/${id}?IsApproved=${IsApproved}`, "PUT", null, token);

// USER ORDERS
export const fetchOrdersByUserId = async (id: number, token: string) =>
    await makeRequest<any>(`/admin/Orders/${id}`, "GET", null, token);

export const updateOrderStatus = async (orderId: number, status: string, token: string) =>
    await makeRequest<any>(`Orders/${orderId}`, "PUT", status, token);