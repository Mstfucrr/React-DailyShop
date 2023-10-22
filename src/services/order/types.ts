
export interface IaddToCartRequest {
    quantity: number;
    size: string | undefined;
    color: string | undefined;
    productId: number;
    userId: number;
}
