import { CardBottomConcepto, CardButtonConcepto, CardContainerConcepto, ContainerConcepto } from './styled'
import { CButtonGroup, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CPlaceholder, CRow } from '@coreui/react'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

const LoaderConceptoCarrito = () => {
  return (
    <ContainerConcepto>
            <CardContainerConcepto>
                <CRow className="g-0">
                    <CCol md={3}>
                        <CCardImage 
                            component="svg" 
                            orientation="top" 
                            width="100%" 
                            height="162" 
                            role="img" 
                            aria-label="Placeholder" 
                        >
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#868e96"></rect>
                        </CCardImage>
                    </CCol>
                    <CCol md={9}>
                        <CCardBody style={{ paddingTop: 0 }}>
                            <CPlaceholder component={CCardTitle} animation="glow" xs={10}>
                                <CPlaceholder xs={12} />
                            </CPlaceholder>
                            <CPlaceholder component={CCardTitle} animation="glow" xs={10}>
                                <CPlaceholder xs={8} />
                            </CPlaceholder>
                            <hr className='mb-2' />
                            <CPlaceholder component={CCardTitle} animation="glow" xs={5}>
                                <CPlaceholder xs={12} />
                                <CPlaceholder className='mt-1' xs={8} />
                            </CPlaceholder>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CardContainerConcepto>
            
        </ContainerConcepto>
  )
}

export default LoaderConceptoCarrito