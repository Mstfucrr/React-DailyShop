import { makeRequest } from "../base/base";


// PRODUCTS
export const getAllProducts = async (token: string) =>
    await makeRequest<any>(`Products`, "GET", null, token);