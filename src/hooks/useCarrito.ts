import { OBTENER_CARRITO, REMOVER_CONCEPTO_CARRITO } from '../graphql/carrito'
import { OBTENER_CLIENTES_VENDEDOR } from '../graphql/movimientos/clientes'
import { Carrito, WrapperQuery , Cliente, S, SearchCarrito } from '../types'
import { useLazyQuery, useMutation } from '@apollo/client'
import { updateDeleteConcepto } from '../cache/carrito'
import { useState } from 'react'
import Swal from 'sweetalert2'

const DEFAULT_SEARCH : SearchCarrito = {
    cliente: ""
}

const useCarrito = ( search : SearchCarrito = DEFAULT_SEARCH ) => {
  
    // APOLLO
    const [ obtenerClientesVendedor , { data: data_clientes } ] = useLazyQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES_VENDEDOR, {
        variables: {
            input: {
                nombre: search.cliente
            }
        },
    });
    
    const [ handleDeleteConcepto ] = useMutation<WrapperQuery<boolean>>(REMOVER_CONCEPTO_CARRITO, {
        update: updateDeleteConcepto
    });

    const [ handleGetCarrito , { data: conceptos , refetch } ] = useLazyQuery<WrapperQuery<Carrito>>(OBTENER_CARRITO);
    const [ loading , setLoading ] = useState(false)
    // STATE
    const [ carrito , setCarrito ] = useState({
        loading: false,
        clientes: []
    })

    const handleObtenerCarrito = async () => {
        
        setLoading(true)
        
        await handleGetCarrito()
        
        await obtenerClientesVendedor()
        
        setLoading(false)

    }

    const handleRemoverConcepto = async ( id: string ) => {

        const { isConfirmed } = await Swal.fire({
            title: '¿Quieres eliminar el concepto del carrito?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: `Cancelar`,
        })

        if( !isConfirmed ) return

        const { data , errors } = await handleDeleteConcepto({
            variables: {
                input: id
            }
        })
        
        if( errors ) {
            return
        }
        
        if( data.removerConceptoCarrito )
        {
            await handleObtenerCarrito()
        }

    }

    const mapClientes = ( data : Cliente[] ) => {

        return data.map( cliente => ({
            label: `${cliente.nombre} ${cliente.apellido} (${cliente.rfc})`,
            value: cliente.id
        }))

    }

    return {
        loading,
        clientes: mapClientes(data_clientes?.obtenerClientesVendedor || []),
        conceptos: conceptos?.obtenerCarrito?.conceptos || [],
        handleObtenerCarrito,
        handleRemoverConcepto
    }
  
}

export default useCarrito
