import { products } from "@/components/shop/example.products";
import axios from "axios";



export async function getProductsByCategoryId(id: number, isDeletedDatas: boolean) {


    // for test 

    // const { data } = await axios.get(`https://api.dailyshop.com/api/Products/GetProductsByCategoryId/${id}`, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     params: {
    //         isDeletedDatas: isDeletedDatas
    //     }
    // });
    // console.log("data : ", data)
    // return data


    const data =
        isDeletedDatas
            ? products.slice(0, 7)
            : products.slice(0, 7).filter((product) => product.isDeleted === false)

    const fetchResponse = {
        status: 200,
        message: "Ürünler başarıyla getirildi.",
        data: data,
        total: data.length
    }

    return fetchResponse

} 
