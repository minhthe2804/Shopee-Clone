/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { lazy, Suspense, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'

// import ProductList from './pages/ProductList'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Profile from './pages/User/pages/Profile'
// import ProductDetail from './pages/ProductDetail'
// import Cart from './pages/Cart'
// import ChangePassword from './pages/User/pages/ChangePassword'
// import HistoryPurchase from './pages/User/pages/HistoryPurchase'
// import NotFound from './pages/NotFound'

const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Suspense>
                                <Cart />
                            </Suspense>
                        </CartLayout>
                    )
                },
                {
                    path: path.user,
                    element: <MainLayout />,
                    children: [
                        {
                            path: '',
                            element: <UserLayout />,
                            children: [
                                {
                                    path: path.profile,
                                    element: (
                                        <Suspense>
                                            <Profile />
                                        </Suspense>
                                    )
                                },
                                {
                                    path: path.changePassword,
                                    element: (
                                        <Suspense>
                                            <ChangePassword />
                                        </Suspense>
                                    )
                                },
                                {
                                    path: path.historyPurchase,
                                    element: (
                                        <Suspense>
                                            <HistoryPurchase />
                                        </Suspense>
                                    )
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            element: <RejectedRoute />,
            children: [
                {
                    path: '',
                    element: <RegisterLayout />,
                    children: [
                        {
                            path: path.login,
                            element: (
                                <Suspense>
                                    <Login />
                                </Suspense>
                            )
                        },
                        {
                            path: path.register,
                            element: (
                                <Suspense>
                                    <Register />
                                </Suspense>
                            )
                        }
                    ]
                }
            ]
        },
        {
            path: '',
            element: <MainLayout />,
            children: [
                {
                    path: path.productDetail,
                    element: (
                        <Suspense>
                            <ProductDetail />
                        </Suspense>
                    )
                },
                {
                    path: '',
                    index: true,
                    element: (
                        <Suspense>
                            <ProductList />
                        </Suspense>
                    )
                },
                {
                    path: '*',
                    element: (
                        <Suspense>
                            <NotFound />
                        </Suspense>
                    )
                }
            ]
        }
        // {
        //     path: path.home,
        //     index: true,
        //     element: (
        //         <MainLayout>
        //             <Suspense>
        //                 <ProductList />
        //             </Suspense>
        //         </MainLayout>
        //     )
        // },
        // {
        //     path: path.productDetail,
        //     element: (
        //         <MainLayout>
        //             <Suspense>
        //                 <ProductDetail />
        //             </Suspense>
        //         </MainLayout>
        //     )
        // },
        // {
        //     path: '*',
        //     element: (
        //         <MainLayout>
        //             <Suspense>
        //                 <NotFound />
        //             </Suspense>
        //         </MainLayout>
        //     )
        // }
    ])

    return routeElements
}
