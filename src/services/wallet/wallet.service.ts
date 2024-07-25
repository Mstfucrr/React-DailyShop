import { privateAxiosInstance } from '../base/base'

type GetWalletByUser = {
  data: {
    balance: number
  }
}

const getWalletByUser = async () => await privateAxiosInstance.get<GetWalletByUser>('Wallets/GetWalletByUser')

type AddMoneyToWallet = {
  amount: number
}

const addMoneyToWallet = async (input: any) =>
  await privateAxiosInstance.post<AddMoneyToWallet>('Wallets/AddMoneyToWallet', input)

export default { getWalletByUser, addMoneyToWallet }
