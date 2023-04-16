import { CCard, CCardBody, CCol, CListGroup, CListGroupItem } from '@coreui/react'
import { OrdenVentaEditContext } from '../context/OrdenVentaEditContext'
import { useContext } from 'react'

const ColTotal = () => {

  const { 
    importe,
    iva,
    total
  } = useContext(OrdenVentaEditContext)

  return (
    <CCol style={{ borderLeft: "1px solid #ddd" }} xs={4}>
      <CCard>
        <CCardBody>
          <CListGroup flush>
            <CListGroupItem className="d-flex justify-content-between align-items-center">
              <strong>Subtotal</strong>
              <strong>{importe}</strong>
            </CListGroupItem>
            <CListGroupItem className="d-flex justify-content-between align-items-center">
              <strong>IVA</strong>
              <strong>{iva}</strong>
            </CListGroupItem>
            <CListGroupItem className="d-flex justify-content-between align-items-center">
              <strong>Total</strong>
              <strong>{total}</strong>
            </CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default ColTotal