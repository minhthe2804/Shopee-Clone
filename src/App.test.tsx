import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils/testUtils'
import { path } from './constants/path'

describe('App', () => {
    test('App render và chuyển trang', async () => {
        const { user } = renderWithRouter()
        /**
         * waitFor sẽ run callback 1 vài lần
         * cho đến khi hết timeout hoặc expect pass
         * số lần run phụ thuộc vào timeout và interval
         * mặc định: timeout = 1000ms và interval = 50ms
         */
        // Verify vào đúng trang chủ
        await waitFor(() => {
            expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
        })

        // Verify vào đúng trang chủ
        await user.click(screen.getByText(/Đăng Nhập/i))
        await waitFor(() => {
            expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeTruthy()
            expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
        })
        screen.debug(document.body.parentElement as HTMLElement, 99999999)
    })
    test('Về trang not found', async () => {
        const badRoute = '/some/bad/route'
        renderWithRouter({ route: badRoute })
        await waitFor(() => {
            expect(screen.getByText(/Page Not Found/i)).toBeTruthy()
        })
        // await logScreen(document.body.parentElement as HTMLElement, {
        //     timeout: 1000
        // })
    })
    test('Render trang register', async () => {
        renderWithRouter({ route: path.register })
        await waitFor(() => {
            expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeTruthy()
        })
        // await logScreen(document.body.parentElement as HTMLElement, {
        //     timeout: 1000
        // })
    })
})
