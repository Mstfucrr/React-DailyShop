import { makeRequest } from "../base/base";


export const getContact = async () =>
    await makeRequest<any>(`/Contacts`, "GET");