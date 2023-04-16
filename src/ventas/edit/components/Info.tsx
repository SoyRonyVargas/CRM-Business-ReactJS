import React, { useContext } from 'react'
import { OrdenVentaEditContext } from '../context/OrdenVentaEditContext'
import { CCardText } from '@coreui/react';

const Info = () => {

    const {
        loading,
        orden
    } = useContext(OrdenVentaEditContext)

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
            <h4>Orden { orden.id } </h4>
            <hr className='' />
            <CCardText className='mb-1'>
                <>Cliente: {orden.cliente.nombre} </>
            </CCardText>
            <CCardText className='mb-1'>
                <> Creado por: {orden.vendedor.nombre} </>
            </CCardText>
            <CCardText className='mb-1'>
                <> Titulo: {orden.titulo_venta} </>
            </CCardText>
            <CCardText className='mb-1'>
                <> Fecha creación: {orden.fecha_entrega} </>
            </CCardText>
        </div>
    )
}

export default Info