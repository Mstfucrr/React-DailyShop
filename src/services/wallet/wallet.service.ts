import { makeRequest } from "../base/base";

export const getWalletByUser = async (token: string) =>
  await makeRequest<any>(`Wallets/GetWalletByUser`, "GET", null, token);

export const addMoneyToWallet = async (input: any, token: string) =>
  await makeRequest<any>(`Wallets/AddMoneyToWallet`, "POST", input, token);
