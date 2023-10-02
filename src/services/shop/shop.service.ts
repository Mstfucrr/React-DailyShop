import { products } from "@/components/shop/example.products";



export async function getProductsByCategoryId(id: number) {


    // const fetchResponse = await fetch(`https://api.dailyshop.com/api/Products/GetProductsByCategoryId/${id}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    // }).then((res) => res.json())

    // return fetchResponse
        
    // for test 

    const data = products.slice(0, 7);

    const fetchResponse = {
        status: 200,
        message: "Ürünler başarıyla getirildi.",
        'Content-Type': 'application/json',
        data: data,
        total: data.length
    }

    return fetchResponse

} 
