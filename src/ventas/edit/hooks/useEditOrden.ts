import { useEffect, useMemo, useState } from 'react'
import { OrdenVentaFull, WrapperQuery } from '../../../types'
import { parseCantidad } from '../../../utils/parseCantidad'
import { ACTUALIZAR_STATUS_CONCEPTO, OBTENER_ORDEN_POR_ID } from '../graphql'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const useEditOrden = () => {
  
    const { id } = useParams<"id">()

    const { data: orden_venta , loading , refetch } = useQuery<WrapperQuery<OrdenVentaFull>>(OBTENER_ORDEN_POR_ID, {
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

    const [ actualizarStatusConcepto ] = useMutation<WrapperQuery<boolean>>(ACTUALIZAR_STATUS_CONCEPTO, {
        fetchPolicy: "network-only"
    })

    const [ loading_concepto , setLoadingConcepto ] = useState<boolean>(false)

    useEffect( () => {

        refetch()

    }, [loading_concepto])

    const handleEditStatusConcepto = async ( id_concepto:string , status: number ) => {
        
        setLoadingConcepto(true)

        const { data } = await actualizarStatusConcepto({
            variables: {
                input: {
                    id_orden: id,
                    id_concepto,
                    status
                }
            }
        })

        const result = data.actualizarStatusConceptoOrdenVenta

        await new Promise(resolve => setTimeout(resolve, 1000));

        if( result )
        {
            
            await Swal.fire({
                title: "Concepto actualizado"
            })
            
        }

        setLoadingConcepto(false)

    }

    

    return {
        orden: orden_venta?.obtenerOrdenenId,
        handleEditStatusConcepto,
        importe: importe(),
        loading_concepto,
        total: total(),
        iva: iva(),
        conceptos,
        loading,
    }

}

export default useEditOrden