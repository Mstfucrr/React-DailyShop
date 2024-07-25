import { privateAxiosInstance } from '../base/base'

export const getSuggestions = async (productCookie: { productId: number; durationInSeconds: number }[]) =>
  await privateAxiosInstance.post<any>(`Suggestions`, productCookie)
