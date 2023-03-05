import { OBTENER_CLIENTES } from '../graphql/movimientos/clientes'
import { useLazyQuery } from '@apollo/client'
import { Cliente, WrapperQuery } from '../types'
import { useState } from 'react'

const useClientesStore = () => {
    
    const [ obtenerClientes , { loading } ] = useLazyQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES)
    const [ clientes , setClientes ] = useState<Cliente[]>([])

    const handleObtenerClientes = async () => {

        try
        {
            
            const { data } = await obtenerClientes()

            setClientes(() => data.obtenerClientesVendedor)

        }
        catch(err)
        {

        }

    }

    return {
        clientes,
        loading,
        handleObtenerClientes
    }

}

export default useClientesStore