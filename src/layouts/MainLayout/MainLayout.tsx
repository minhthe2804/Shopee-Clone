import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

interface Props {
    children?: React.ReactNode
}

function MainLayoutIner({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
            <Outlet />
            <Footer />
        </div>
    )
}

const MainLayout = memo(MainLayoutIner)
export default MainLayout
