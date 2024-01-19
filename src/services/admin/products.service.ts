import { makeRequest } from "../base/base";
import { deleteProduct } from "../product/product.service";

// PRODUCTS
export const getAllProducts = async (token: string) =>
  await makeRequest<any>(`Products`, "GET", null, token);

// deleteProduct
export { deleteProduct };
