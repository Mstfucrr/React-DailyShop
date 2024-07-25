/*

import { makeRequest } from '../base/base'

export const getWalletByUser = async (token: string) =>
  await makeRequest<any>(`Wallets/GetWalletByUser`, 'GET', null, token)

export const addMoneyToWallet = async (input: any, token: string) =>
  await makeRequest<any>(`Wallets/AddMoneyToWallet`, 'POST', input, token)

*/

import { useQuery, useMutation } from '@tanstack/react-query'
import walletService from './wallet.service'
import reactQueryConfig from '@/configs/react-query-config'

export const useGetWalletByUser = () =>
  useQuery({
    queryKey: ['getWalletByUser'],
    queryFn: walletService.getWalletByUser
  })

// Balance: 15
type AddMoneyToWalletInput = {
  Balance: number
}

export const useAddMoneyToWallet = () =>
  useMutation({
    mutationKey: ['addMoneyToWallet'],
    mutationFn: (input: AddMoneyToWalletInput) => walletService.addMoneyToWallet(input),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getWalletByUser'] })
    }
  })
