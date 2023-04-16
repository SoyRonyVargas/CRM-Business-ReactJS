import {OrdenVentaListado, WrapperQuery } from '../../../types'
import { OBTENER_ORDENES_VENTA } from '../graphql'
import { useQuery } from '@apollo/client'

const useVentas = () => {
  
    const { data , loading } = useQuery<WrapperQuery<OrdenVentaListado[]>>( OBTENER_ORDENES_VENTA , {
        fetchPolicy: 'network-only',
    })

    const ordenes = data?.obtenerOrdenesVenta || [];

    return {
        loading,
        ordenes
    }

}

export default useVentas