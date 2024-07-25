import { useMutation, useQuery } from '@tanstack/react-query'
import { privateAxiosInstance } from '../base/base'
import reactQueryConfig from '@/configs/react-query-config'

type Settings = {
  data: {
    about: string
    email: string
    phone: string
    address: string
    siteIcon: string
  }
}

const getSettings = async () => privateAxiosInstance.get<Settings>(`Admin/WebSiteSettings`)

const saveSettings = async (val: FormData) =>
  privateAxiosInstance.put(`Admin/WebSiteSettings`, val, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const useGetSettings = () =>
  useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  })

export const useSaveSettings = () =>
  useMutation({
    mutationKey: ['saveSettings'],
    mutationFn: saveSettings,
    onSuccess: () => {
      reactQueryConfig.invalidateQueries({ queryKey: ['settings'] })
    }
  })
