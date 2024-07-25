import reactQueryConfig from '@/configs/react-query-config'
import { useMutation, useQuery } from '@tanstack/react-query'
import reviewService from './review.service'

export const useGetReviewsByProductId = (productId: number) =>
  useQuery({
    queryKey: ['GetReviewByProductId', productId],
    queryFn: () => reviewService.getReviewsByProductId(productId).then(res => res.data.data)
  })

export const useAddReviewToProduct = () =>
  useMutation({
    mutationKey: ['AddReviewToProduct'],
    mutationFn: ({ productId, input }: { productId: number; input: any }) =>
      reviewService.addReviewToProduct(productId, input),
    onSuccess: () => reactQueryConfig.invalidateQueries({ queryKey: ['GetReviewByProductId'] })
  })

export const useAddAnswerToReview = () =>
  useMutation({
    mutationKey: ['AddAnswerToReview'],
    mutationFn: ({ productId, input }: { productId: number; input: any }) =>
      reviewService.addAnswerToReview(productId, input),
    onSuccess: () => reactQueryConfig.invalidateQueries({ queryKey: ['GetReviewByProductId'] })
  })

export const useDeleteReviewFromProduct = () =>
  useMutation({
    mutationKey: ['DeleteReviewFromProduct'],
    mutationFn: (reviewId: number) => reviewService.deleteReviewFromProduct(reviewId),
    onSuccess: () => reactQueryConfig.invalidateQueries({ queryKey: ['GetReviewByProductId'] })
  })
