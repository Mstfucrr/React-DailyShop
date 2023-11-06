import axios, { AxiosResponse, Method, AxiosError } from 'axios';

const apiBaseUrl = "http://localhost:5025/api";

export const makeRequest = async <T>(url: string, method: Method, data?: any, token?: string): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const api = axios.create({
            baseURL: apiBaseUrl,
            headers,
        });

        try {
            const response: AxiosResponse<T> = await api.request({
                url,
                method,
                data,
            });
            resolve(response.data);
        } catch (error : any) {
            if (axios.isAxiosError(error)) {
                reject(new Error(error.response?.data?.Message || error.message));
            } else {
                reject(new Error(error));
            }
        }
    });
}