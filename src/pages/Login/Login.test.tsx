import { screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import { path } from '~/constants/path'
import { logScreen, renderWithRouter } from '~/utils/testUtils'

describe('Login', () => {
    let emailInput: HTMLInputElement
    let passwordInput: HTMLInputElement
    let submitButton: Element
    beforeAll(async () => {
        renderWithRouter({ route: path.login })
        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Email')).toBeTruthy()
        })
        emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
        passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement
        submitButton = document.querySelector('button') as Element
    })
    it('Hiển thị lỗi required khi không nhập gì', async () => {
        const submitButton = document.querySelector('button') as Element
        fireEvent.submit(submitButton as Element)
        await waitFor(() => {
            expect(screen.queryByText('Email là bắt buộc')).toBeTruthy()
            expect(screen.queryByText('Password là bắt buộc')).toBeTruthy()
        })
    })
    it('Hiển thị lỗi input nhập sai value', async () => {
        fireEvent.change(emailInput, {
            target: {
                value: 'minhthe28123'
            }
        })
        fireEvent.change(passwordInput, {
            target: {
                value: '2804'
            }
        })
        fireEvent.submit(submitButton)
        await waitFor(() => {
            expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
            expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
        })

        // await logScreen(document.body.parentElement as HTMLElement, {
        //     timeout: 1000
        // })
    })
    it('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
        fireEvent.change(emailInput, {
            target: {
                value: 'minhthe2804@gmail.com'
            }
        })
        fireEvent.change(passwordInput, {
            target: {
                value: '28042003'
            }
        })

        // Những trường hợp chứng minh rằng tìm không ra text hay là element
        // Thì nên dùng query hơn là find hay get
        await waitFor(() => {
            expect(screen.queryByText('Email không đúng định dạng')).toBeNull()
            expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeNull()
        })
        fireEvent.submit(submitButton)
        await logScreen(document.body.parentElement as HTMLElement, {
            timeout: 1000
        })
    })
})
