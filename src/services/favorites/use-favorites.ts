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
