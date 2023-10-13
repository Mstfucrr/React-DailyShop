import { products } from "@/components/shop/example.products";
import axios from "axios";
import { IProductRequest, IProductResponse, IReviewResponse } from "./types";




export const addProduct = async (input: IProductRequest, token: string): Promise<IProductResponse> => {

    // const { fetchResponse } = await fetch("https://api.dailyshop.com/api/Products", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify(input.data),
    // }).then((res) => ({ fetchResponse: res.json() }))

    // const { data } = await axios.post("https://api.dailyshop.com/api/Products", input, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization : token
    //     },
    // });
    // console.log("data : ", data)
    // return data
    // for test 
    const fetchResponse: IProductResponse = {
        status: 200,
        message: "Ürün başarıyla eklendi.",
        data: products[0]
    }

    return fetchResponse
    // for err test
    // const fetchResponse: IProductResponse = {
    //     status: 400,
    //     message: "Ürün eklenirken bir hata oluştu.",
    //     data: null
    // }


};

export const getProductById = async (id: number): Promise<IProductResponse> => {

    // const { fetchResponse } = await fetch(`https://api.dailyshop.com/api/Products/${id}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // }).then((res) => ({ fetchResponse: res.json() }))

    // for test 
    const fetchResponse: IProductResponse = {
        status: 200,
        message: "Ürün başarıyla getirildi.",
        data: products[0]
    }

    // for err test
    // const fetchResponse: IProductResponse = {
    //     status: 400,
    //     message: "Ürün getirilirken bir hata oluştu.",
    //     data: null
    // }
    return fetchResponse

}


export const addReviewToProduct = async (id: number, input: any,token : string) : Promise<IReviewResponse> => {

    // const { fetchResponse } = await fetch(`https://api.dailyshop.com/api/Products/AddReviewToProduct/${id}`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `${token}`,
    //     },
    //     body: JSON.stringify(input),
    // }).then((res) => ({ fetchResponse: res.json() }))


    console.log(input)
    // for test

    const fetchResponse = {
        status: 200,
        message: "Yorum başarıyla eklendi.",
        data: products[0].reviews,
    }

    // for err test
    // const fetchResponse = {
    //     status: 400,
    //     message: "Yorum eklenirken bir hata oluştu.",
    //     data: null
    // }        


    return fetchResponse
}

export const deleteReviewFromProduct = async (productId: number, reviewId: number, token: string) : Promise<IReviewResponse> => {
    
    // const { fetchResponse } = await fetch(`https://api.dailyshop.com/api/Products/DeleteReviewFromProduct/${productId}/${reviewId}`, {
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `${token}`,
    //     },

    // for test
    const fetchResponse = {
        status: 200,
        message: "Yorum başarıyla silindi.",
        data: products[0].reviews,
    }

    // for err test
    // const fetchResponse = {
    //     status: 400,
    //     message: "Yorum silinirken bir hata oluştu.",
    //     data: null
    // }

    return fetchResponse
}




