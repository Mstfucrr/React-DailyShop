import { cartItemsExample } from "@/components/shop/example.products";


export const getCart = async () => {

    // const { fetchResponse } = await fetch("https://api.dailyshop.com/api/Cart", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    // }).then((res) => ({ fetchResponse: res.json() }))
    

    // for test
    // const fetchResponse = {
    //     status: 200,
    //     message: "Sepet başarıyla getirildi.",
    //     'Content-Type': 'application/json',
    //     data: cartItemsExample
    // }

    // for err test
    const fetchResponse = {
        status : 400,
        message : "Sepet getirilirken bir hata oluştu",
        'Content-Type': 'application/json',
        data : null
    }

    
    return fetchResponse


}