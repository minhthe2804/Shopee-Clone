import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import athApi from '~/apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { AppContext } from '~/contexts/app.context'
import { AuthResponse } from '~/types/auth.type'
import { ErrorResponse } from '~/types/utils.type'
import { schema, Schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { path } from '~/constants/path'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
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
            password: '',
            confirm_password: ''
        },
        resolver: yupResolver(registerSchema)
    })

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => athApi.registerAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirm_password'])
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data)
                const newData = data.data as AuthResponse
                toast.success('Bạn đã đăng kí thành công', { autoClose: 3000 })
                reset({ email: '', password: '', confirm_password: '' })
                setIsAuthenticated(true)
                setProfile(newData.data.user)
                navigate(path.home)
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirm_password'>, {
                                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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
            <Helmet>
                <title>Đăng ký || Shopee Clone</title>
                <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
            </Helmet>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                            <div className='text-xl'>Đăng Ký</div>
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
                            <Input
                                className='mt-2'
                                type='password'
                                placeholder='Confirm Password'
                                register={register}
                                errorMessage={errors.confirm_password?.message}
                                name='confirm_password'
                                autoComplete='on'
                            />
                            <div className='mt-3'>
                                <Button
                                    className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                                    isLoading={registerAccountMutation.isPending}
                                    disabled={registerAccountMutation.isPending}
                                >
                                    Đăng ký
                                </Button>
                            </div>
                            <div className='mt-8 flex items-center justify-center text-sm'>
                                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                                <Link className='ml-1 text-red-400' to={path.login}>
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
