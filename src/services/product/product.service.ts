import { IProductRequest } from "./types";
import { makeRequest } from "../base/base";

export const addProduct = async (input: IProductRequest, token: string) => 
    await makeRequest<any>("Products", "POST", input, token);

export const getProductById = async (id: number) =>
    await makeRequest<any>(`Products/${id}`, "GET");


export const addReviewToProduct = async (id: number, input: any, token: string) =>
    await makeRequest<any>(`Products/AddReviewToProduct/${id}`, "POST", input, token);

export const deleteReviewFromProduct = async (productId: number, reviewId: number, token: string) =>
    await makeRequest<any>(`Products/DeleteReviewFromProduct/${productId}/${reviewId}`, "DELETE", null, token);



