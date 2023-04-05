import { CButtonGroup, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { CardBottomConcepto, CardButtonConcepto, CardContainerConcepto, ContainerConcepto } from './styled'
import useCarrito from '../../../hooks/useCarrito'
import { ConceptoCarrito } from '../../../types'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { FC } from 'react'
import { parseCantidad } from '../../../utils/parseCantidad'

const Concepto : FC<ConceptoCarrito> = ( props ) => {
    
    const { handleRemoverConcepto } = useCarrito()
    
    const { producto , cantidad , id , importe , total , iva } = props

    const remove = () => {
        handleRemoverConcepto(id)
    }

    return (
        <ContainerConcepto>
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
                                {/* <pre>
                                    {
                                        JSON.stringify( producto , null , 3 )
                                    }
                                </pre> */}
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
                    {/* <CCol md={3}>
                        <CCardBody style={{ paddingTop: 0 }}>
                            <CCardText className='mb-1'>
                                Cantidad:
                                <strong> { cantidad } </strong>
                            </CCardText>
                            <CCardText className='mt-0'>
                                Importe:
                                <strong> ${ cantidad } </strong>
                            </CCardText>
                        </CCardBody>
                    </CCol> */}
                </CRow>
            </CardContainerConcepto>
            <hr className='mt-0 mb-0' />
            <CardBottomConcepto>
                <CCardBody>
                <CButtonGroup size="sm" role="group" aria-label="Basic example">
                    <CardButtonConcepto onClick={remove} variant='ghost' size="sm" color="primary">
                        <CIcon className='mr-1' icon={cilTrash} />
                        Eliminar
                    </CardButtonConcepto>
                    {/* <CButton color="primary">Middle</CButton> */}
                </CButtonGroup>
                </CCardBody>
            </CardBottomConcepto>
        </ContainerConcepto>
    )
}

export default Concepto