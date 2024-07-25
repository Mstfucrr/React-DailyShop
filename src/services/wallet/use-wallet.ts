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
