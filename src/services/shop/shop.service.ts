import { makeRequest } from "../base/base";



export const getProductsByCategoryId = async (id: number, isDeletedDatas: boolean) => 
    await makeRequest<any>(`Products/category/${id}?isDeleteShow=${isDeletedDatas}`, "GET", null);
