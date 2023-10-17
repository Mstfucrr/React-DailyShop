import axios from "axios";
import { IProductRequest, IProductResponse, IReviewResponse } from "./types";
import { products } from "@/components/shop/example.products";




export const addProduct = async (input: IProductRequest, token: string): Promise<IProductResponse> => {
    const { data } = await axios.post("https://api.dailyshop.com/api/Products", input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("data : ", data)
    return data
};

export const getProductById = async (id: number): Promise<IProductResponse> => {
    // const { data } = await axios.get(`https://api.dailyshop.com/api/Products/${id}`, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });
    const data = products[0];
    console.log("data : ", data)
    return {data : data , message : "success" , status : 200}
}


export const addReviewToProduct = async (id: number, input: any, token: string): Promise<IReviewResponse> => {
    const { data } = await axios.post(`https://api.dailyshop.com/api/Products/AddReviewToProduct/${id}`, input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("data : ", data)
    return data

}

export const deleteReviewFromProduct = async (productId: number, reviewId: number, token: string): Promise<IReviewResponse> => {

    const { data } = await axios.delete(`https://api.dailyshop.com/api/Products/DeleteReviewFromProduct/${productId}/${reviewId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("data : ", data)
    return data
}




