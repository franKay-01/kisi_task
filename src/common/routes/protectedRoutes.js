import { Outlet, Navigate } from "react-router-dom"
import { Layout } from "../components"

const ProtectedRoute = () => {
    const fakeAuth = sessionStorage.getItem('qqrv')

    const builder = () => {
        return (
            <Layout>
                <Outlet />
            </Layout>
        )
    }

    return !!fakeAuth ? builder() : <Navigate to='/login' />
}

export default ProtectedRoute