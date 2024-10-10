import http from '~/utils/http'

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-access-token'

const authApi = {
    registerAccount: (body: { email: string; password: string }) => http.post(URL_REGISTER, body),
    login: (body: { email: string; password: string }) => http.post(URL_LOGIN, body),
    logout: () => http.post(URL_LOGOUT)
}

export default authApi
