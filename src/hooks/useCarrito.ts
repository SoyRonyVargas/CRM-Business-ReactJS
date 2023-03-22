import { OBTENER_CARRITO, REMOVER_CONCEPTO_CARRITO } from '../graphql/carrito';
import { Carrito, WrapperQuery } from '../types';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { OBTENER_CLIENTES_VENDEDOR } from '../graphql/movimientos/clientes';

const useCarrito = () => {
  
    const [ handleClientesVendedor ] = useLazyQuery<WrapperQuery<Carrito>>(OBTENER_CLIENTES_VENDEDOR);
    const [ handleDeleteConcepto ] = useMutation<WrapperQuery<boolean>>(REMOVER_CONCEPTO_CARRITO);
    const [ handleGetCarrito ] = useLazyQuery<WrapperQuery<Carrito>>(OBTENER_CARRITO);
    const [ carrito , setConceptos ] = useState({
        loading: false,
        conceptos: []
    })

    const handleObtenerCarrito = async () => {

        setConceptos({
            ...carrito,
            loading: true
        })

        const { data } = await handleGetCarrito()

        setConceptos({
            ...carrito,
            conceptos: data.obtenerCarrito.conceptos,
            loading: false
        })

    }

    const handleObtenerClientesVendedor = async () => {

        const { data } = await handleObtenerClientesVendedor()

    }
    
    const handleRemoverConcepto = async ( id: string ) => {

        const { isConfirmed } = await Swal.fire({
            title: '¿Quieres eliminar el concepto del carrito?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: `Cancelar`,
        })

        if( !isConfirmed ) return

        setConceptos({
            ...carrito,
            loading: true
        })

        const { data, errors } = await handleDeleteConcepto({
            variables: {
                input: id
            }
        })

        if( errors ) {
            return
        }

        await handleObtenerCarrito()

    }

    return {
        ...carrito,
        handleObtenerCarrito,
        handleRemoverConcepto
    }
  
}

export default useCarrito
