import { CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { CardContainerConcepto, ContainerConcepto } from './styled'
import { parseCantidad } from '../../../../utils/parseCantidad' 
import { OrdenVentaConcepto } from '../../../../types' 
import { FC } from 'react'

const Concepto : FC<OrdenVentaConcepto> = ( props ) => {
    
    const { producto , cantidad , importe , total , iva } = props

    return (
        <ContainerConcepto>
            {/* <pre>
                {
                    JSON.stringify( props , null , 3 )
                }
            </pre> */}
            <CardContainerConcepto>
                <CRow className="g-0">
                    <CCol md={3}>
                        <CCardImage 
                            src={producto?.imagen[0]} 
                            style={{ borderRadius: 0 }}
                        />
                    </CCol>
                    <CCol md={9}>
                        <CCardBody style={{ paddingTop: 0 }}>
                            <CCardTitle>
                                {
                                    producto?.nombre
                                }
                            </CCardTitle>
                            <CCardText className='mb-2'>
                                {
                                    producto?.descripcion
                                }
                            </CCardText>
                            <hr className='mb-2 mt-2' />
                            <CCardText className='mb-1'>
                                <strong>Cantidad: { cantidad } </strong>
                            </CCardText>
                            <CCardText className='mb-1'>
                                <strong> Importe: { parseCantidad(importe) } </strong>
                            </CCardText>
                            <CCardText className='mb-1'>
                                
                                <strong> IVA: { parseCantidad(iva) } </strong>
                            </CCardText>
                            <CCardText className='mt-0 mb-0'>
                                <strong>Total: { parseCantidad(total) } </strong>
                            </CCardText>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CardContainerConcepto>
        </ContainerConcepto>
    )
}

export default Concepto