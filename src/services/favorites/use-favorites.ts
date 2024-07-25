/*
const getFavorites = async () => await makeRequest<any>('Favorites/GetFavorites', 'GET', null)

const addFavorite = async (token: string, productId: number) =>
  await makeRequest<any>(`Favorites/AddFavorite?productId=${productId}`, 'POST', null, token)

const deleteFavorite = async (token: string, favoriteId: number) =>
  await makeRequest<any>(`Favorites/DeleteFavorite?favoriteId=${favoriteId}`, 'DELETE', null, token)

*/

import { useMutation, useQuery } from '@tanstack/react-query'
import { favoritesService } from './favorites.service'
import reactQueryConfig from '@/configs/react-query-config'

const useGetFavorites = () =>
  useQuery({
    queryKey: ['getFavorites'],
    queryFn: () => favoritesService.getFavorites()
  })

const useAddFavorite = () =>
  useMutation({
    mutationKey: ['addFavorite'],
    mutationFn: (productId: number) => favoritesService.addFavorite(productId),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getFavorites'] })
    }
  })

const useDeleteFavorite = () =>
  useMutation({
    mutationKey: ['deleteFavorite'],
    mutationFn: (favoriteId: number) => favoritesService.deleteFavorite(favoriteId),
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['getFavorites'] })
    }
  })

export { useGetFavorites, useAddFavorite, useDeleteFavorite }
