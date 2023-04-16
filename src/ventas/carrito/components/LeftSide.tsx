import LoaderConceptoCarrito from '../../../components/carrito/concepto/Loader'
import Concepto from '../../../components/carrito/concepto'
import { CarritoContext } from '../context/CarritoContext'
import React, { useContext } from 'react'
import { CCol } from '@coreui/react'

const LeftSide = () => {

    const {
        carrito,
        loading
    } = useContext(CarritoContext)

    return (
        <CCol xs={8}>
            {
                (loading == false && carrito) ?
                    <>
                        {
                            carrito?.map((c) => (
                                <Concepto key={c.id} {...c} />
                            ))
                        }
                    </>
                    :
                    <>
                        {
                            [1, 2].map(e => (
                                <LoaderConceptoCarrito />
                            ))
                        }
                    </>
            }
        </CCol>
    )
}

export default LeftSide