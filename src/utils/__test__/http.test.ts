import { describe, expect, it, beforeEach } from 'vitest'

import { setAccesTokenToLS, setRefreshTokenToLS } from '../auth'
import { Http } from '../http'
import HttpStatusCode from '~/constants/httpStatusCode.emum'

describe('http axios', () => {
    let http = new Http().instance
    beforeEach(() => {
        localStorage.clear()
        http = new Http().instance
    })
    const access_token_1s =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk0M2VmYmE2MTRhMzdmOGM4OGRkNiIsImVtYWlsIjoibWluaHRoZTI4MDRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0xMlQxNjo1Mjo0OS41MTlaIiwiaWF0IjoxNzI4NzUxOTY5LCJleHAiOjE3Mjg3NTE5NzB9.0b2e20fqp_fWfAmUOuCrWrsGQEj1m7nwTdJ7xdtkfPA'
    const refresh_token_1000days =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk0M2VmYmE2MTRhMzdmOGM4OGRkNiIsImVtYWlsIjoibWluaHRoZTI4MDRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0xMlQxNjo1Mjo0OS41MTlaIiwiaWF0IjoxNzI4NzUxOTY5LCJleHAiOjE4MTUxNTE5Njl9.HGPOc8yDnnSMKcLAs_caDaVbMXytL0FKCu5bDV13b9k'
    it('Gọi API', async () => {
        // Không nên đụng đến thư mục apis
        // Vì chúng ta test riêng file http thì chỉ "nên" dùng http thôi
        // vì lỡ như thư mục apis có thay đổi gì đó
        // thì cũng không ảnh hưởng gì đến file test này
        const res = await http.get('/products')
        expect(res.status).toBe(HttpStatusCode.Ok)
    })
    it('Auth Request', async () => {
        // Nên có 1 cái account test
        // và 1 server test
        await http.post('/login', {
            email: 'minhthe2804@gmail.com',
            password: '28042003'
        })
        const res = await http.get('/me')
        expect(res.status).toBe(HttpStatusCode.Ok)
    })
    it('Refresh Token', async () => {
        setAccesTokenToLS(access_token_1s)
        setRefreshTokenToLS(refresh_token_1000days)
        const httpNew = new Http().instance
        const res = await httpNew.get('/me')
        expect(res.status).toBe(HttpStatusCode.Ok)
    })
})
