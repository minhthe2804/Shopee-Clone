import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

import { path } from '~/constants/path'
import Button from '~/components/Button'
import { Category } from '~/types/category.type'
import { QueryConfig } from '~/hooks/useQueryConfig'
import InputNumber from '~/components/InputNumber'
import { priceSchema, Schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from '~/types/utils.type'
import RatingStars from '../RatingStars'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'
interface Props {
    queryConfig: QueryConfig
    categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

/**
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */

export default function AsideFilter({ categories, queryConfig }: Props) {
    const { category } = queryConfig
    const { t } = useTranslation('home')
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            price_min: '',
            price_max: ''
        },
        resolver: yupResolver(priceSchema)
    })

    const navigate = useNavigate()
    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                price_max: data.price_max,
                price_min: data.price_min
            }).toString()
        })
    })

    const handleRemoveAll = () => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])
            ).toString()
        })
    }

    return (
        <div className='py-4'>
            <Link
                to={path.home}
                className={classNames('flex items-center font-bold', {
                    'text-orange': !category
                })}
            >
                <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
                    <g fillRule='evenodd' stroke='none' strokeWidth={1}>
                        <g transform='translate(-373 -208)'>
                            <g transform='translate(155 191)'>
                                <g transform='translate(218 17)'>
                                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                {t('aside filter.all categories')}
            </Link>
            <div className='my-4 h-[1px] bg-gray-300' />
            <ul>
                {categories.map((categoryItem, index) => {
                    const isAcitve = category === categoryItem._id
                    let changeCategories = ''
                    if (index === 0) {
                        changeCategories = 'aside filter.tShirt'
                    } else if (index === 1) {
                        changeCategories = 'aside filter.watch'
                    } else {
                        changeCategories = 'aside filter.phone'
                    }
                    return (
                        <li className='py-2 pl-2' key={categoryItem._id}>
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        category: categoryItem._id
                                    }).toString()
                                }}
                                className={classNames('relative px-2', {
                                    'font-semibold text-orange': isAcitve
                                })}
                            >
                                {isAcitve && (
                                    <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2'>
                                        <polygon points='4 3.5 0 0 0 7' />
                                    </svg>
                                )}
                                {t(changeCategories)}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
                <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-3 h-4 w-3 fill-current stroke-current'
                >
                    <g>
                        <polyline
                            fill='none'
                            points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                {t('aside filter.filter search')}
            </Link>
            <div className='my-4 h-[1px] bg-gray-300' />
            <div className='my-5'>
                <div className=''>{t('aside filter.priceRange')}</div>
                <form className='mt-2' onSubmit={onSubmit}>
                    <div className='flex items-start'>
                        <Controller
                            control={control}
                            name='price_min'
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        type='text'
                                        className='grow'
                                        placeholder='₫ TỪ'
                                        classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm placeholder:text-sm'
                                        classNameError='hidden'
                                        {...field}
                                        onChange={(event) => {
                                            field.onChange(event)
                                            trigger('price_max')
                                        }}
                                    />
                                )
                            }}
                        />
                        {/* <InputV2
                            control={control}
                            name='price_min'
                            type='number'
                            className='grow'
                            placeholder='₫ TỪ'
                            classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm placeholder:text-sm'
                            classNameError='hidden'
                            onChange={() => {
                                trigger('price_max')
                            }}
                        /> */}
                        <div className='mx-2 mt-[13px] h-[1px] w-[10px] shrink-0 bg-gray-400'></div>
                        <Controller
                            control={control}
                            name='price_max'
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        type='text'
                                        className='grow'
                                        placeholder='₫ ĐẾN'
                                        classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm placeholder:text-sm'
                                        classNameError='hidden'
                                        {...field}
                                        onChange={(event) => {
                                            field.onChange(event)
                                            trigger('price_min')
                                        }}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>
                        {errors.price_min?.message || errors.price_max?.message}
                    </div>
                    <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
                        Áp Dụng
                    </Button>
                </form>
            </div>
            <div className='my-4 h-[1px] bg-gray-300' />
            <div className='text-sm'>{t('aside filter.evaluate')}</div>
            <RatingStars queryConfig={queryConfig} />
            <div className='my-4 h-[1px] bg-gray-300' />
            <Button
                onClick={handleRemoveAll}
                className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
            >
                Xóa tất cả
            </Button>
        </div>
    )
}
