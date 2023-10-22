
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