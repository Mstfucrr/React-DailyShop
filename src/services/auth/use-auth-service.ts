import { useMutation } from '@tanstack/react-query'
import { authService } from './auth.service'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function useAuthService() {
  const router = useRouter()
  const { mutate: register, isPending: isRegisterLoading } = useMutation({
    mutationFn: authService.register,
    mutationKey: ['register'],
    onSuccess: data => {
      toast.success(data.data.message)
      router.push('/login')
    },
    onError: error => toast.error(error.message)
  })

  const { mutate: forgotPassword, isPending: isForgotPasswordLoading } = useMutation({
    mutationFn: authService.forgotPassword,
    mutationKey: ['forgotPassword'],
    onSuccess: data => toast.success(data.data.message),
    onError: error => toast.error(error.message)
  })

  const { mutate: resetPassword, isPending: isResetPasswordLoading } = useMutation({
    mutationFn: authService.resetPassword,
    mutationKey: ['resetPassword'],
    onSuccess: data => toast.success(data.data.message),
    onError: error => toast.error(error.message)
  })

  const { mutate: updateAccount, isPending: isUpdateAccountLoading } = useMutation({
    mutationFn: authService.updateAccount,
    mutationKey: ['updateAccount'],
    onSuccess: data => toast.success(data.data.message),
    onError: error => toast.error(error.message)
  })

  const { mutate: deleteAccount, isPending: isDeleteAccountLoading } = useMutation({
    mutationFn: authService.deleteAccount,
    mutationKey: ['deleteAccount'],
    onSuccess: data => toast.success(data.data.message),
    onError: error => toast.error(error.message)
  })

  const { mutate: updateAddress, isPending: isUpdateAddressLoading } = useMutation({
    mutationFn: authService.updateAddress,
    mutationKey: ['updateAddress'],
    onSuccess: data => toast.success(data.data.message),
    onError: error => toast.error(error.message)
  })

  const { mutate: deleteAddress, isPending: isDeleteAddressLoading } = useMutation({
    mutationFn: authService.deleteAddress,
    mutationKey: ['deleteAddress'],
    onSuccess: data => toast.success(data.data.message),
    onError: error => toast.error(error.message)
  })

  return {
    register,
    forgotPassword,
    resetPassword,
    updateAccount,
    deleteAccount,
    updateAddress,
    deleteAddress,
    isRegisterLoading,
    isForgotPasswordLoading,
    isResetPasswordLoading,
    isUpdateAccountLoading,
    isDeleteAccountLoading,
    isUpdateAddressLoading,
    isDeleteAddressLoading
  }
}
