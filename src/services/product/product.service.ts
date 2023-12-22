import { makeRequest } from "../base/base";

export const addProduct = async (input: any, token: string) => 
    await makeRequest<any>("Products", "POST", input, token, true);

export const getProductById = async (id: number,token :string | undefined) =>
    await makeRequest<any>(`Products/${id}`, "GET", null, token);

export const getProductByUser = async (token : string) =>
    await makeRequest<any>(`Products/GetListProductByUser`, "GET", null, token);

export const deleteProduct = async (id: number, token: string) =>
    await makeRequest<any>(`Products/DeleteProduct/${id}`, "DELETE", null, token);

export const updateProduct = async (id: number, input: any, token: string) =>
    await makeRequest<any>(`Products/${id}`, "PUT", input, token, true);

export const addReviewToProduct = async (productId: number, input: any, token: string) =>
    await makeRequest<any>(`/Reviews/AddReviewToProduct/${productId}`, "POST", input, token);

export const addAnswerToReview = async (productId: number, input: any, token: string) =>
    await makeRequest<any>(`/Reviews/AddAnswerToReview/${productId}`, "POST", input, token);

export const deleteReviewFromProduct = async (productId: number, reviewId: number, token: string) =>
    await makeRequest<any>(`Products/DeleteReviewFromProduct/${productId}/${reviewId}`, "DELETE", null, token);

