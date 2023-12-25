import { IUser } from "@/services/auth/types"

export interface IProduct {
    id: number,
    name: string,
    price: number,
    image: string | undefined,
    images: string[] | [] | undefined,
    categoryId: number,
    category: ICategory | undefined,
    description: string,
    status: string,
    stock: number,
    rating: number,
    colors: string[] | undefined,
    sizes: string[] | undefined,
    tags: string[] | undefined,
    date: Date,
    reviews: IReview[],
    isDeleted: boolean | undefined | null,
    isApproved: boolean | undefined | null,
    userId: number,
}

export interface ICategory {
    id: number
    name: string
    parentCategoryId: number | undefined
    subCategories: ICategory[] | null

}

export interface IReview {
    id: number,
    date: string,
    rating: number,
    productId: number,
    product: IProduct | undefined,
    comment: string,
    user: IUser | undefined,
    status: string | undefined,
    userPurchasedThisProduct: boolean | undefined
}



export interface IShopResponse {
    status: number;
    message: string;
    data: IProduct[];
    total: number;
}

export interface ICartItem {
    id: number,
    product: IProduct,
    quantity: number,
    color: string,
    size: string
}

// gelen datalar pagnition ile listelencek
