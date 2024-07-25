import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'

// const apiBaseUrl = 'https://dailyshopapi20240517220441.azurewebsites.net/api'
const apiBaseUrl = 'http://localhost:22498/api'

export const makeRequest = async <T>(
  url: string,
  method: Method,
  data?: any,
  token?: string,
  hasFile: boolean = false
): Promise<T> => {
  // eğer datanın içinde file varsa multipart/form-data olarak gönderiyoruz yoksa application/json olarak gönderiyoruz
  const headers: Record<string, string> = {
    'Content-Type': hasFile ? `multipart/form-data;` : 'application/json'
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const api = axios.create({
    baseURL: apiBaseUrl,
    headers
  })

  try {
    const response: AxiosResponse<T> = await api.request({
      url,
      method,
      data
    })
    return response.data
  } catch (error: any) {
    throw new Error(axios.isAxiosError(error) ? error.response?.data?.Message || error.message : error) // Throw an error
  }
}

export const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 10000
})

export const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 10000
})

const addErrorHandlingResponse = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // authService.logout()
      }
      return Promise.reject(error)
    }
  )
}

const addAuthHeaderRequest = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken()
      if (!token) return config
      if (config.headers['Authorization'] === undefined) config.headers['Authorization'] = 'Bearer ' + token
      return config
    },
    error => Promise.reject(new Error(error))
  )
}

export const getToken = () => {
  const token = localStorage.getItem('user')
  if (token) return token
  return null
}

addErrorHandlingResponse(publicAxiosInstance)
addErrorHandlingResponse(privateAxiosInstance)

addAuthHeaderRequest(privateAxiosInstance)
