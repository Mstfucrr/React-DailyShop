import { IUser } from "@/services/auth/types"

export interface IProduct {
    id: number,
    name: string,
    price: number,
    image: File | undefined | string,
    images: File[] | undefined | [],
    categoryId: number,
    description: string,
    information: {
        status: string,
        stock: number
    },
    rating: number ,
    colors: string[]| undefined,
    sizes: string[]| undefined,
    tags: string[]| undefined,
    date: Date ,
    reviews: IReview[],
    isDeleted: boolean | undefined | null,

}

export interface IReview {
    id: number,
    name: string | undefined,
    email: string | undefined,
    date: Date,
    rating: number,
    productId: number,
    product: IProduct | undefined,
    review: string,
    user: IUser | undefined,
    avatar: string | undefined
}



export interface IShopResponse {
    status: number;
    message: string;
    data: IProduct[];
    total: number;
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
