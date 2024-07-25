import { IProduct } from '@/shared/types'
import { privateAxiosInstance } from '../base/base'

type GetFavoritesResponse = {
  data: IProduct[]
}

const getFavorites = async () => await privateAxiosInstance.get<GetFavoritesResponse>('Favorites/GetFavorites')

const addFavorite = async (productId: number) =>
  await privateAxiosInstance.post<any>(`Favorites/AddFavorite?productId=${productId}`)

const deleteFavorite = async (favoriteId: number) =>
  await privateAxiosInstance.delete<any>(`Favorites/DeleteFavorite?favoriteId=${favoriteId}`)

export const favoritesService = {
  getFavorites,
  addFavorite,
  deleteFavorite
}
