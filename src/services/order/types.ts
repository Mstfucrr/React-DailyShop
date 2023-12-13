import { IProduct } from "@/shared/types";
import { IUser } from "../auth/types";

export interface IaddToCartRequest {
    quantity: number;
    size: string | undefined;
    color: string | undefined;
}

export interface IOrder {
    id: number | undefined;
    address: IOrderAddress;
    status: Ordertatus;
    user: IUser;
    totalPrice: number;
    orderItems: IOrderItem[];
    date: string;
}

export enum Ordertatus {
    New = 'New',
    Accepted = 'Accepted',
    Preparing = 'Preparing',
    OnShipping = 'OnShipping',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export interface IOrderItem {
    id: number | undefined;
    product: IProduct;
    price: number;
    quantity: number;
    size: string;
    color: string;
}

export interface IOrderAddress {
    id: number;
    title: string;
    address: string;
    city: string;
    state: string;
    country: string;
}
