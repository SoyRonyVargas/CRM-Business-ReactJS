import { CButton, CCard, CCardBody, CCol, CListGroup, CListGroupItem } from '@coreui/react'
import { CarritoContext } from '../context/CarritoContext'
import { cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useContext } from 'react'

const Total = () => {

    const { orden , loading } = useContext(CarritoContext)

    return (
        <CCol style={{ borderLeft: "1px solid #ddd" }} xs={4}>
            <CCard>
                <CCardBody>
                    <CListGroup flush>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <strong>Subtotal</strong>
                            <strong>{orden.importe}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <strong>IVA</strong>
                            <strong>{orden.iva}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <strong>Total</strong>
                            <strong>{orden.total}</strong>
                        </CListGroupItem>
                    </CListGroup>
                    <hr className="mt-0" />
                    <CButton 
                        disabled={loading}
                        type="submit" 
                        className="w-100" 
                        color="primary" 
                        shape="rounded-1"
                    >
                        <CIcon className="mr-1" icon={cilSave} />
                        Guardar Orden
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Total