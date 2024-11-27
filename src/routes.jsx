import React, { Suspense } from 'react'
import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { PrivateRoutes } from './misc'
import ForgotPassworComponent from './components/forgot-passsword'
const LoginPage = lazy(() => import('../src/components/login/index'))
const Dashboard = lazy(() => import('../src/components/dashboard/index'))
const DummyData = lazy(() => import('../src/components/dashboard/dummyData'))
const Remindr = lazy(() => import('../src/components/soundEffects/index'))

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
            </Routes>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
            </Routes>
            <Routes>
                <Route path='/dashboard'
                    element={
                        <PrivateRoutes>
                            <Dashboard />
                            {/* <DummyData /> */}
                        </PrivateRoutes>
                    }
                />
            </Routes>
            {/* <Routes>
                    <Route path='/:id' element={<ForgotPassworComponent />} />
                </Routes> */}

        </BrowserRouter>

    )
}

export default AppRoutes