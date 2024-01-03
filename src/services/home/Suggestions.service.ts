import { makeRequest } from "../base/base";


export const getSuggestions = async (token: string, productCookie: { productId: number, durationInSeconds: number }[]) =>
    await makeRequest<any>(`Suggestions`, "POST", productCookie, token);