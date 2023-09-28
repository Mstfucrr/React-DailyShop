import { IUser } from "@/services/auth/types"

export interface IProduct {
    id: number,
    name: string,
    price: number,
    discount: number,
    image: string,
    images: string[] | undefined,
    category: string,
    description: string,
    information: {
        status: string,
        stock: number
    } | undefined,
    rating: number,
    reviews: number,
    colors: string[],
    sizes: string[],
    tags: string[],
    date: Date,
    reviewsData: IReviews[],
    
}

export interface IReviews {
    id: number,
    name: string | undefined,
    email: string | undefined,
    date: Date,
    rating: number,
    productId: number,
    product : IProduct | undefined,
    review: string,
    user : IUser | undefined,
    avatar : string | undefined
}



export interface IShopResponse {
    data: IProduct[]
}

export interface Iinfo {
    count: number,
    pages: number,
}

export interface ICartItem {
    id: number,
    product: IProduct,
    quantity: number,
}

  // gelen datalar pagnition ile listelencek
