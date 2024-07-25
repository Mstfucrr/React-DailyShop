import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

// const apiBaseUrl = 'https://dailyshopapi20240517220441.azurewebsites.net/api'
const apiBaseUrl = 'http://localhost:22498/api'

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
