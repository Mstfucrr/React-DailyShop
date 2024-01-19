import { makeRequest } from '../base/base'

export const getSiteIcon = async () => await makeRequest<any>(`/Abouts/GetIcon`, 'GET')
