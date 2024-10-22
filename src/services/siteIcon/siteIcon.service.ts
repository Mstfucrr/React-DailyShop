import { useQuery } from '@tanstack/react-query'
import { publicAxiosInstance } from '../base/base'
import { AxiosResponse } from 'axios'

type SiteIcon = {
  data: string
  message: string
}

export const getSiteIcon = async (): Promise<AxiosResponse<SiteIcon>> =>
  await publicAxiosInstance.get('/Abouts/GetIcon')

export const useGetSiteIcon = () =>
  useQuery({
    queryKey: ['siteIcon'],
    queryFn: () => getSiteIcon().then(res => res.data)
  })
