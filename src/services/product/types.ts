export interface IProductInfo {
  name: string;
  price: number;
  stock: number;
  description: string;
  status: string;
  categoryId: number;
  colors: string[] | undefined;
  sizes: string[] | undefined;
}
