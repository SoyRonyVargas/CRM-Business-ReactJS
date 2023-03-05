import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import React, { Fragment, Suspense, useEffect } from 'react'
import useAuthStore from './hooks/useAuthStore'
import Loader from './components/loader'



// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Login = React.lazy(() => import('./pages/Login'))

const App = () => {

    const { checkAuthOnInit , auth_login , isAutenticated } = useAuthStore()

    useEffect( () => {

      checkAuthOnInit()

    }, [])

    return (
      <>
        {
          auth_login.loading
          &&
          <Loader/>
        }
        <>
        <Suspense fallback={<Loader/>}>
          <Routes>
            {
              !isAutenticated
              ?
              <Fragment>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace={true} />} />
              </Fragment>
              :
              <>
                {
                  (isAutenticated && !auth_login.loading) &&
                  <Fragment>
                    <Route path="/404" element={<Page404 />} />
                    <Route path="/500" element={<Page500 />} />
                    <Route path="*" element={<DefaultLayout />} />
                  </Fragment>
                }
              </>
            }
          </Routes>
        </Suspense>
      </>
      </>
    )

}

export default App
