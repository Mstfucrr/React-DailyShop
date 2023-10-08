import { products } from "@/components/shop/example.products";
import { IProductRequest, IProductResponse } from "./types";




export const addProduct = async (input: IProductRequest): Promise<IProductResponse> => {

    // const { fetchResponse } = await fetch("https://api.dailyshop.com/api/Products", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify(input.data),
    // }).then((res) => ({ fetchResponse: res.json() }))

    // for test 
    const fetchResponse: IProductResponse = {
        status: 200,
        message: "Ürün başarıyla eklendi.",
        data: products[0]
    }

    // for err test
    // const fetchResponse: IProductResponse = {
    //     status: 400,
    //     message: "Ürün eklenirken bir hata oluştu.",
    //     data: null
    // }


    return fetchResponse
};

export const getProductById = async (id: number): Promise<IProductResponse> => {

    // const { fetchResponse } = await fetch(`https://api.dailyshop.com/api/Products/${id}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const addReviewToProduct = async (id: number, input: any) : Promise<IProductResponse> => {

    // const { fetchResponse } = await fetch(`https://api.dailyshop.com/api/Products/AddReviewToProduct/${id}`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify(input),
    // }).then((res) => ({ fetchResponse: res.json() }))


    console.log(input)
    // for test

    const fetchResponse = {
        status: 200,
        message: "Yorum başarıyla eklendi.",
        data: null
    }

    // for err test
    // const fetchResponse = {
    //     status: 400,
    //     message: "Yorum eklenirken bir hata oluştu.",
    //     data: null
    // }        


    return fetchResponse
}


