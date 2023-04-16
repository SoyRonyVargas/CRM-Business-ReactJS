import { useMemo } from 'react'
import { OrdenVentaFull, WrapperQuery } from '../../../types'
import { parseCantidad } from '../../../utils/parseCantidad'
import { OBTENER_ORDEN_POR_ID } from '../graphql'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const useEditOrden = () => {
  
    const { id } = useParams<"id">()

    const { data: orden_venta , loading } = useQuery<WrapperQuery<OrdenVentaFull>>(OBTENER_ORDEN_POR_ID, {
        fetchPolicy: 'network-only',
        variables: {
            input: id
        },
    })

    const conceptos = orden_venta?.obtenerOrdenenId?.conceptos || [];

    const calcularImporteOrden = () => {

        let importe = 0;

        for( let concepto of conceptos )
        {
            importe += concepto.importe;
        }

        return parseCantidad(importe);

    }
    
    const calcularIVAOrden = () => {

        let iva = 0;

        for( let concepto of conceptos )
        {
            iva += concepto.iva;
        }

        return parseCantidad(iva);

    }
    
    const calcularTotalOrden = () => {

        let total = 0;

        for( let concepto of conceptos )
        {
            total += concepto.total;
        }

        return parseCantidad(total);

    }

    const importe = useMemo(() => calcularImporteOrden, [conceptos]);
    const total = useMemo(() => calcularTotalOrden, [conceptos]);
    const iva = useMemo(() => calcularIVAOrden, [conceptos]);


    return {
        loading,
        orden: orden_venta?.obtenerOrdenenId,
        conceptos,
        importe: importe(),
        total: total(),
        iva: iva(),
    }

}

export default useEditOrden