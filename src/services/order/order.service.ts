import { IaddToCartRequest } from "./types";
import { makeRequest } from "../base/base";

export const getCart = async (token: string) => 
    await makeRequest<any>("Carts", "GET", null, token);

export const addToCart = async (productId: number,input: IaddToCartRequest, token: string) => 
    await makeRequest<any>(`Carts?productId=${productId}`, "POST", input, token);

export const updateCart = async (id: number, input: any, token: string) =>
    await makeRequest<any>(`Cart/${id}`, "PUT", input, token);

export const removeFromCart = async (id: number, token: string) => 
    await makeRequest<any>(`Cart/${id}`, "DELETE", null, token);