import axios, { AxiosResponse, Method } from 'axios';

const apiBaseUrl = "http://localhost:5025/api";

export const makeRequest = async <T>(url: string, method: Method, data?: any, token?: string, hasFile: boolean = false): Promise<T> => {

    // eğer datanın içinde file varsa multipart/form-data olarak gönderiyoruz yoksa application/json olarak gönderiyoruz
    const headers: Record<string, string> = {
        "Content-Type": hasFile
            ? `multipart/form-data; boundary=${generateBoundary()}`
            : "application/json",
    }

    if (token)
        headers.Authorization = `Bearer ${token}`;


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
        console.log(error.response?.data?.Message || error.message)
        throw new Error(axios.isAxiosError(error) ? (error.response?.data?.Message || error.message) : error); // Throw an error
    }
};

function generateBoundary() {
    let boundary = "--------------------------"; // Örnek bir başlangıç değeri

    for (let i = 0; i < 24; i++) {
        // 24 karakterlik rastgele bir dize oluşturun
        const randomChar = Math.floor(Math.random() * 36).toString(36);
        boundary += randomChar;
    }

    return boundary;
}