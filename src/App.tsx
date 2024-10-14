import { useContext, useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { localStorageEventTarget } from './utils/auth'
import { AppContext, AppProvider } from './contexts/app.context'
import '~/i18n/i18n'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ErrorBoundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0
        }
    }
})

function App() {
    const routeElements = useRouteElements()

    const { reset } = useContext(AppContext)
    useEffect(() => {
        localStorageEventTarget.addEventListener('clearLS', reset)

        return () => {
            localStorageEventTarget.removeEventListener('clearLS', reset)
        }
    }, [reset])
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <ErrorBoundary>
                        {routeElements}
                        <ToastContainer />
                    </ErrorBoundary>
                </AppProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </HelmetProvider>
    )
}

export default App
