import { useQuery } from '@tanstack/react-query'
import { privateAxiosInstance } from '../base/base'
import { IProduct } from '@/shared/types'

interface IProductCookie {
  productId: number
  durationInSeconds: number
}

interface IGetSuggestionsResponse {
  data: IProduct[]
}

export const getSuggestions = async (productCookie: IProductCookie[]) =>
  await privateAxiosInstance.post<IGetSuggestionsResponse>(`Suggestions`, productCookie)

export const useGetSuggestions = (productCookie: IProductCookie[]) =>
  useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getSuggestions(productCookie).then(res => res.data)
  })
