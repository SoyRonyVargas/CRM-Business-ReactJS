import RightSide from '../../components/pages/productID/RightSide'
import LeftSide from '../../components/pages/productID/LeftSide'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import useFichaProducto from '../../hooks/useFichaProducto'
import React, { createContext } from 'react'
import { Producto } from '../../types'
import { FormikConfig } from 'formik'

type Values = {
    cantidad: number
}

type ContextFicha = {
    producto?: Producto
    loading: boolean
    formik?: FormikConfig<Values> | null
}

export const FichaContext = createContext<ContextFicha>({
    loading: false,
    producto: null,
    formik: null
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