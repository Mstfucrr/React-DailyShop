
export interface IProductRequest {
    name: string,
    price: number,
    coverImage: string,
    images: string[],
    categoryId: number,
    description: string,
    status: string,
    stock: number
    colors: string[] | undefined,
    sizes: string[] | undefined,

}

export interface IProductInfo {
    name: string,
    price: number,
    stock: number,
    description: string,
    status: string,
    categoryId: number,
    colors: string[] | undefined,
    sizes: string[] | undefined,
    coverImage: string,
    images: string[],
}