import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { Suspense , FC , memo } from 'react'
import routes from '../routes'

const AppContent : FC = () => (
  <CContainer lg>
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {
          routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={<route.element />}
                />
              )
            )
          })
        }
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  </CContainer>
)

export default memo(AppContent)
