import http from '~/utils/http'

const authApi = {
    registerAccount: (body: { email: string; password: string }) => http.post('/register', body),
    login: (body: { email: string; password: string }) => http.post('/login', body),
    logout: () => http.post('/logout')
}

export default authApi
