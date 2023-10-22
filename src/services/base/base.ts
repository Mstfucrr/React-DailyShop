import axios, { AxiosResponse, Method } from "axios";

const apiBaseUrl = "http://localhost:5025/api";

export const makeRequest = async <T>(url: string, method: Method, data?: any, token?: string): Promise<T> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response: AxiosResponse<T> = await axios({
        url: `${apiBaseUrl}/${url}`,
        method,
        data,
        headers,
    });
    return response.data;
}