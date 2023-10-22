import { IaddToCartRequest } from "./types";
import { makeRequest } from "../base/base";

export const getCart = async (token: string) => 
    await makeRequest<any>("Cart", "GET", null, token);

export const addToCart = async (input: IaddToCartRequest, token: string) => 
    await makeRequest<any>("Cart", "POST", input, token);

export const removeFromCart = async (id: number, token: string) => 
    await makeRequest<any>(`Cart/${id}`, "DELETE", null, token);