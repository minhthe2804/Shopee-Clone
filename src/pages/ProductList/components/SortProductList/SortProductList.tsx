import { createSearchParams, useNavigate, Link } from 'react-router-dom'
import classNames from 'classnames'
import  omit  from 'lodash/omit'

import { path } from '~/constants/path'
import { ProductListConfig } from '~/types/product.type'
import { sortBy, order as oderConstant } from '~/constants/product'
import { QueryConfig } from '~/hooks/useQueryConfig'

interface Props {
    queryConfig: QueryConfig
    pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
    const page = Number(queryConfig.page)
    const { sort_by = sortBy.createdAt, order } = queryConfig
    const navigate = useNavigate()

    const handleShort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue
                    },
                    ['order']
                )
            ).toString()
        })
    }

    const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        return sort_by === sortByValue
    }

    const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.price,
                order: orderValue
            }).toString()
        })
    }

    return (
        <div className='bg-gray-300/40 px-3 py-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex flex-wrap items-center gap-2'>
                    <div>Sắp xếp theo</div>
                    <button
                        className={classNames('h-8 px-4 text-center text-sm capitalize', {
                            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
                            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
                        })}
                        onClick={() => handleShort(sortBy.view)}
                    >
                        Phổ biến
                    </button>
                    <button
                        className={classNames('h-8 px-4 text-center text-sm capitalize', {
                            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
                            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
                        })}
                        onClick={() => handleShort(sortBy.createdAt)}
                    >
                        Mới nhất
                    </button>
                    <button
                        className={classNames('h-8 px-4 text-center text-sm capitalize', {
                            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
                            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
                        })}
                        onClick={() => handleShort(sortBy.sold)}
                    >
                        Bán chạy
                    </button>
                    <select
                        className={classNames('h-8 px-4 text-center text-sm capitalize outline-none', {
                            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
                            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
                        })}
                        value={order || ''}
                        onChange={(event) =>
                            handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
                        }
                    >
                        <option value='' disabled className='bg-white text-black'>
                            Giá
                        </option>
                        <option value={oderConstant.asc} className='bg-white text-black'>
                            Giá: Thấp đến cao
                        </option>
                        <option value={oderConstant.desc} className='bg-white text-black'>
                            Giá: Cao đến thấp
                        </option>
                    </select>
                </div>

                <div className='flex items-center'>
                    <div>
                        <span className='text-orange'>{page}</span>
                        <span>/{pageSize}</span>
                    </div>
                    <div className='ml-2 flex'>
                        {page === 1 ? (
                            <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-3'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M15.75 19.5 8.25 12l7.5-7.5'
                                    />
                                </svg>
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (page - 1).toString()
                                    }).toString()
                                }}
                                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-3'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M15.75 19.5 8.25 12l7.5-7.5'
                                    />
                                </svg>
                            </Link>
                        )}
                        {page === pageSize ? (
                            <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-3'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                                </svg>
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (page + 1).toString()
                                    }).toString()
                                }}
                                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-3'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
