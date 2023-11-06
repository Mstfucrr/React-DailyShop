import axios, { AxiosResponse, Method } from 'axios';

const apiBaseUrl = "http://localhost:5025/api";

export const makeRequest = async <T>(url: string, method: Method, data?: any, token?: string): Promise<T> => {
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
        return response.data; // Return the data directly
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.Message || error.message); // Throw an error
        } else {
            throw new Error(error); // Throw an error
        }
    }
};
