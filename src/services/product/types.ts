import { IProduct } from "@/shared/types";

export interface IProductRequest {
    data: {
        name: string,
        price: number,
        image: File,
        images: File[],
        categoryId: number,
        description: string,
        status: string,
        stock: number
        colors: string[],
        sizes: string[] | undefined,
    }

}

export interface IProductResponse {
    status: number;
    message: string;
    data: IProduct | null;
}
