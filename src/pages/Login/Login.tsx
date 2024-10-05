import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { loginSchema, Schema } from '~/utils/rules'
import authApi from '~/apis/auth.api'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ErrorResponse } from '~/types/utils.type'
import Input from '~/components/Input'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import Button from '~/components/Button'
import { AuthResponse } from '~/types/auth.type'
import { path } from '~/constants/path'

type FormData = Pick<Schema, 'email' | 'password'>
export default function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (body: FormData) => authApi.login(body)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                const newData = data.data as AuthResponse
                toast.success('Đăng nhập thành công', { autoClose: 3000 })
                reset({ email: '', password: '' })
                setIsAuthenticated(true)
                setProfile(newData.data.user)
                navigate(path.home)
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
                    const formError = error.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof FormData, {
                                message: formError[key as keyof FormData],
                                type: 'Server'
                            })
                        })
                    }
                    // if (formError?.email) {
                    //     setError('email', {
                    //         message: formError.email,
                    //         type: 'Server'
                    //     })
                    // }
                    // if (formError?.password) {
                    //     setError('password', {
                    //         message: formError.password,
                    //         type: 'Server'
                    //     })
                    // }
                }
            }
        })
    })

    return (
        <div className='bg-orange'>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                            <div className='text-xl'>Đăng nhập</div>
                            <Input
                                className='mt-7'
                                type='email'
                                placeholder='Email'
                                register={register}
                                errorMessage={errors.email?.message}
                                name='email'
                                autoComplete='on'
                            />
                            <Input
                                className='mt-2'
                                type='password'
                                placeholder='Password'
                                register={register}
                                errorMessage={errors.password?.message}
                                name='password'
                                autoComplete='on'
                            />
                            <div className='mt-3'>
                                <Button
                                    className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                                    isLoading={loginMutation.isPending}
                                    disabled={loginMutation.isPending}
                                >
                                    Đăng Nhập
                                </Button>
                            </div>
                            <div className='mt-8 flex items-center justify-center text-sm'>
                                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                                <Link className='ml-1 text-red-400' to={path.register}>
                                    Đăng Ký
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
