import RightSide from '../../components/pages/productID/RightSide'
import LeftSide from '../../components/pages/productID/LeftSide'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import useFichaProducto from '../../hooks/useFichaProducto'
import { Producto, ValuesFicha } from '../../types'
import React, { createContext } from 'react'

type ContextFicha = {
    onSubmit?: ( values : ValuesFicha ) => Promise<void>
    loading_create: boolean
    producto?: Producto
    loading: boolean
}

export const FichaContext = createContext<ContextFicha>({
    loading_create: false,
    loading: false,
    producto: null,
    onSubmit: null
})

const ProductoIDView = () => {

    const contextFicha = useFichaProducto()

    return (
        <FichaContext.Provider value={contextFicha}>
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol xs={5}>
                            <LeftSide/>
                        </CCol>
                        <CCol xs={7}>
                            <RightSide/>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </FichaContext.Provider>
    )
}

export default ProductoIDView