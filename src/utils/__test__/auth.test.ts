import { describe, it, expect, beforeEach } from 'vitest'
import {
    clearLS,
    getAccesTokenFromLS,
    getProfileFromLS,
    getRefreshTokenFromLS,
    setAccesTokenToLS,
    setProfileFromLS,
    setRefreshTokenToLS
} from '../auth'
import { User } from '~/types/user.type'

beforeEach(() => {
    localStorage.clear()
})

const access_token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk0M2VmYmE2MTRhMzdmOGM4OGRkNiIsImVtYWlsIjoibWluaHRoZTI4MDRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0xMlQwODo0NjowMi45MDNaIiwiaWF0IjoxNzI4NzIyNzYyLCJleHAiOjE3MjkzMjc1NjJ9.2SpiHwtYkogG2_lveI0P-js9gn-VzgCX1boNH55Ni20'

const refresh_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk0M2VmYmE2MTRhMzdmOGM4OGRkNiIsImVtYWlsIjoibWluaHRoZTI4MDRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0xMC0xMlQwODo0NjowMi45MDNaIiwiaWF0IjoxNzI4NzIyNzYyLCJleHAiOjE3MzczNjI3NjJ9.xzT1bLiNzfG0tSffv7w3qioZgMvNefc58dFr8Fs_I5w'

const profile = {
    _id: '66e943efba614a37f8c88dd6',
    roles: ['User'],
    email: 'minhthe2804@gmail.com',
    createdAt: '2024-09-17T08:55:11.217Z',
    updatedAt: '2024-10-09T03:42:10.040Z',
    __v: 0,
    address: 'Hòa Bình',
    date_of_birth: '2003-04-27T17:00:00.000Z',
    name: 'Minh Thế',
    phone: '0383395765',
    avatar: 'c4d6e37b-ab78-41c1-9582-80198acf62e1.jpg'
}

describe('access_token', () => {
    it('access_token được lưu vào localStorage', () => {
        setAccesTokenToLS(access_token)
        expect(getAccesTokenFromLS()).toBe(access_token)
    })
})

describe('refresh_token', () => {
    it('refresh_token được lưu vào localStorage', () => {
        setRefreshTokenToLS(refresh_token)
        expect(getRefreshTokenFromLS()).toEqual(refresh_token)
    })
})

describe('profile', () => {
    it('profile được lưu vào localStorage', () => {
        setProfileFromLS(profile as User)
        expect(getProfileFromLS()).toEqual(profile)
    })
})

describe('clearLS', () => {
    it('Xóa hết access_token, refresh_token, profile', () => {
        setAccesTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        setProfileFromLS(profile as User)
        clearLS()
        expect(getAccesTokenFromLS()).toBe('')
        expect(getRefreshTokenFromLS()).toBe('')
        expect(getProfileFromLS()).toBe(null)
    })
})
