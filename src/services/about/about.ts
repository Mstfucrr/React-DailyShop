import { useQuery } from '@tanstack/react-query'
import { publicAxiosInstance } from '../base/base'

type About = {
  data: string
}

const getAbout = async () => publicAxiosInstance.get<About>(`/Abouts/GetAbout`)

export const useGetAbout = () =>
  useQuery({
    queryKey: ['getAbout'],
    queryFn: () => getAbout().then(res => res.data)
  })
