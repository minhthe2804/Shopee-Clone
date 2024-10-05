import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import HttpStatusCode from '~/constants/httpStatusCode.emum'
import { AuthResponse } from '~/types/auth.type'
import { clearLS, getAccesTokenFromLS, setAccesTokenToLS, setProfileFromLS } from './auth'
import { path } from '~/constants/path'
import config from '~/constants/config'

export class Http {
    instance: AxiosInstance
    private accessToken: string
    constructor() {
        this.accessToken = getAccesTokenFromLS()
        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken
                    return config
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        // Add a response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config
                if (url === path.login || url === path.register) {
                    const data = response.data as AuthResponse
                    this.accessToken = data.data.access_token
                    setAccesTokenToLS(this.accessToken)
                    setProfileFromLS(data.data.user)
                } else if (url === path.logout) {
                    this.accessToken = ''
                    clearLS()
                }
                return response
            },
            (error: AxiosError) => {
                // Xử lí lỗi message trả về không phải lỗi 422
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data
                    const message = data?.message || error.message
                    toast.error(message)
                }
                if (error.response?.status === HttpStatusCode.Unauthorized) {
                    clearLS()
                }
                return Promise.reject(error)
            }
        )
    }
}
const http = new Http().instance
export default http
