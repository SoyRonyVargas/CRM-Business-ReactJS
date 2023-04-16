import { OrdenVentaEditContext } from './context/OrdenVentaEditContext'
import { CCard, CCardBody, CRow } from '@coreui/react'
import ColConceptos from './components/ColConceptos'
import useEditOrden from './hooks/useEditOrden'
import ColTotal from './components/ColTotal'
import Info from './components/Info'

const index = () => {

  const ordenedit = useEditOrden()

  return (
    <OrdenVentaEditContext.Provider value={ordenedit}>
      <CCard>
        <CCardBody>
          <Info/>
          <hr />
          <CCard>
            <CCardBody>
              <CRow>
                <ColConceptos />
                <ColTotal />
              </CRow>
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </OrdenVentaEditContext.Provider>
  )
}

export default index