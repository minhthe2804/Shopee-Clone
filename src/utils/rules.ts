import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: 'Email là bắt buộc'
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không đúng định dạng'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 5 - 160 ký tự'
        },
        minLength: {
            value: 5,
            message: 'Độ dài từ 5 - 160 ký tự'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Password là bắt buộc'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 6 - 160 ký tự'
        },
        minLength: {
            value: 6,
            message: 'Độ dài từ 6 - 160 ký tự'
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Nhập lại password là bắt buộc'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 6 - 160 ký tự'
        },
        minLength: {
            value: 6,
            message: 'Độ dài từ 6 - 160 ký tự'
        },
        validate:
            typeof getValues === 'function'
                ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
                : undefined
    }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
    const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
    if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
    }
    return price_min !== '' || price_max !== ''
}

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Nhập lại password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
    email: yup
        .string()
        .required('Email là bắt buộc')
        .email('Email không đúng định dạng')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
        .string()
        .required('Password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: handleConfirmPasswordYup('password'),
    price_min: yup.string().required('Nhập số tiền để tìm kiếm').test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: testPriceMinMax
    }),
    price_max: yup.string().required('Nhập số tiền để tìm kiếm').test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: testPriceMinMax
    }),
    name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
    name: yup.string().max(160, 'Độ dài tối da là 160 kí tự'),
    phone: yup.string().max(20, 'Độ dài tối da là 20 kí tự'),
    address: yup.string().max(160, 'Độ dài tối da là 160 kí tự'),
    avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
    date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
    password: schema.fields['password'],
    new_password: schema.fields['password'],
    confirm_password: handleConfirmPasswordYup('new_password')
})

export const loginSchema = schema.pick(['email', 'password'])
export const priceSchema = schema.pick(['price_min', 'price_max'])
// export type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
export type UserSchema = yup.InferType<typeof userSchema>
