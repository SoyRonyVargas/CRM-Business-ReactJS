import { OrdenVentaEditContext } from '../context/OrdenVentaEditContext'
import { CBadge, CCardText } from '@coreui/react';
import useUtils from '../../../hooks/useUtils';
import React, { useContext } from 'react'

const Info = () => {

    const {
        loading,
        orden
    } = useContext(OrdenVentaEditContext)

    if (loading) return <p>Cargando...</p>;


    const handleRenderDate = ( date : string ) => {

        let _date = new Date(date)

        const __date = _date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
              
        let _horas : number | string = _date.getHours()
        let minutos : any = _date.getMinutes()

        let typeHora = "AM"
        if( _horas > 12 )
        {
            typeHora = "PM"
        }
        if( minutos < 10 )
        {
            minutos = `0${minutos}`
        }
        
  
        return `${__date} ${_horas}:${minutos}${typeHora}`
  
    }

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
                <> Fecha creación: {handleRenderDate(orden.fecha_entrega)} </>
            </CCardText>
            <CCardText className='mb-1'>
                <span className='mr-1'>
                    Estado: 
                </span>
                    {
                        orden.status == 0 &&
                        <CBadge color="success ml-1">ACTIVO</CBadge>
                    }
                    {
                        orden.status == 1 &&
                        <CBadge color="info">Terminado</CBadge>
                    }
            </CCardText>
        </div>
    )
}

export default Info