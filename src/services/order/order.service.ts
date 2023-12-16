import { IOrderRequest, IaddToCartRequest } from "./types";
import { makeRequest } from "../base/base";

// Cart
export const getCart = async (token: string) => 
    await makeRequest<any>("Carts", "GET", null, token);

export const addToCart = async (productId: number,input: IaddToCartRequest, token: string) => 
    await makeRequest<any>(`Carts?productId=${productId}`, "POST", input, token);

export const updateCart = async (id: number, input: any, token: string) =>
    await makeRequest<any>(`Carts/Update/${id}`, "PUT", input, token);

export const removeFromCart = async (id: number, token: string) => 
    await makeRequest<any>(`Carts/Delete/${id}`, "DELETE", null, token);

// Order
export const getOrders = async (token: string) => 
    await makeRequest<any>("Orders", "GET", null, token);

export const getOrder = async (id: number, token: string) =>
    await makeRequest<any>(`Orders/${id}`, "GET", null, token);

export const createOrder = async (input: IOrderRequest, token: string) =>
    await makeRequest<any>("Orders", "POST", input, token);
