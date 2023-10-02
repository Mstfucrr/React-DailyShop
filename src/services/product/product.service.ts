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
        'Content-Type': 'application/json',
        data: products[0]
    }

    // for err test
    // const fetchResponse: IProductResponse = {
    //     status: 400,
    //     message: "Ürün eklenirken bir hata oluştu.",
    //     'Content-Type': 'application/json',
    //     data: null
    // }


    return fetchResponse
};

export const getProductById = async (id: string): Promise<IProductResponse> => {

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
        'Content-Type': 'application/json',
        data: products[0]
    }

    // for err test
    // const fetchResponse: IProductResponse = {
    //     status: 400,
    //     message: "Ürün getirilirken bir hata oluştu.",
    //     'Content-Type': 'application/json',
    //     data: null
    // }
    return fetchResponse

}


