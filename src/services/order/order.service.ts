import { cartItemsExample } from "@/components/shop/example.products";


export const getCart = async () => {

    // const { fetchResponse } = await fetch("https://api.dailyshop.com/api/Cart", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer: ${localStorage.getItem("token")}`,
    //     },
    // }).then((res) => ({ fetchResponse: res.json() }))


    // for test
    // const fetchResponse = {
    //     status: 200,
    //     message: "Sepet başarıyla getirildi.",
    //     data: cartItemsExample
    // }

    // for err test
    const fetchResponse = {
        status: 400,
        message: "Sepet getirilirken bir hata oluştu",
        data: null
    }


    return fetchResponse


}

export interface IaddToCartRequest {
    quantity: number,
    size: string | undefined,
    color: string | undefined
    productId: number,
    userId: number
}

export const addToCart = async (cartAdd: IaddToCartRequest, token: string) => {

    // const { fetchResponse } = await fetch("https://api.dailyshop.com/api/Cart", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer: ${token}`,
    //     },
    //     body: JSON.stringify(cartAdd),
    // }).then((res) => ({ fetchResponse: res.json() }))

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
