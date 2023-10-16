import { cartItemsExample } from "@/components/shop/example.products";
import axios from "axios";


export const getCart = async (token: string) => {

    // const { data } = await axios.get(`https://api.dailyshop.com/api/Cart`, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer: ${localStorage.getItem("token")}`,
    //     },
    // });
    // return data

    // for test
    const fetchResponse = {
        status: 200,
        message: "Sepet başarıyla getirildi.",
        data: cartItemsExample
    }

    // for err test
    // const fetchResponse = {
    //     status: 400,
    //     message: "Sepet getirilirken bir hata oluştu",
    //     data: null
    // }


    return fetchResponse


}

export interface IaddToCartRequest {
    quantity: number,
    size: string | undefined,
    color: string | undefined
    productId: number,
    userId: number
}

export const addToCart = async (input: IaddToCartRequest, token: string) => {

    // const { fetchResponse } = await fetch("https://api.dailyshop.com/api/Cart", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer: ${token}`,
    //     },
    //     body: JSON.stringify(cartAdd),
    // }).then((res) => ({ fetchResponse: res.json() }))

    // const { data } = await axios.post(`https://api.dailyshop.com/api/Cart`, input, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    // });

    // return data
    // for test
    const fetchResponse = {
        status: 200,
        message: "Ürün başarıyla sepete eklendi.",
        data: cartItemsExample
    }

    // for err test
    // const fetchResponse = {
    //     status : 400,
    //     message : "Ürün sepete eklenirken bir hata oluştu",
    //     data : null
    // }

    return fetchResponse
}

export const removeFromCart = async (id: number, token: string) => {

    const { data } = await axios.delete(`https://api.dailyshop.com/api/Cart/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data

    // for test
    // const fetchResponse = {
    //     status: 200,
    //     message: "Ürün başarıyla sepetten silindi.",
    //     data: cartItemsExample.filter((item) => item.id !== id)
    // }
    // console.log(cartItemsExample.filter((item) => item.id !== id))
    // return fetchResponse

}