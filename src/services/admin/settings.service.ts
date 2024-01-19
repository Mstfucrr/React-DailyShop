import { makeRequest } from '../base/base'

export const fetchSettings = async (token: string) =>
  await makeRequest<any>(`Admin/WebSiteSettings`, 'GET', null, token)

export const saveSettings = async (val: any, token: string) =>
  await makeRequest<any>(`Admin/WebSiteSettings`, 'PUT', val, token, true)
