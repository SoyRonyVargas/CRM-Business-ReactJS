import { GET_MEJORES_CLIENTES, GET_MEJORES_VENDEDORES } from '../graphql'
import { MejorCliente, MejorVendedor, WrapperQuery } from '../../types'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

const useDashboard = () => {
  
    const { 
        data: data_mejores_vendedores,
        startPolling,
        stopPolling
    } = useQuery<WrapperQuery<MejorVendedor[]>>(GET_MEJORES_VENDEDORES)
    
    const { 
        data: data_mejores_clientes,
        startPolling: startPolling2,
        stopPolling: stopPolling2
    } = useQuery<WrapperQuery<MejorCliente[]>>(GET_MEJORES_CLIENTES)

    useEffect( () => {

        startPolling(1000)
        startPolling2(1000)

        return () => {
            stopPolling()
            stopPolling2()
        }

    }, [startPolling , startPolling])

    const vendedores = data_mejores_vendedores?.mejoresVendedores || []
    const clientes = data_mejores_clientes?.mejoresClientes || []

    const mejoresVendedores = () => {

        let nuevos_vendedores = []

        vendedores.map( (mejor_vendedor, index) => {
            return nuevos_vendedores[index] = {
                ...mejor_vendedor.vendedor[0],
                total: mejor_vendedor.total
            }
        })

        return nuevos_vendedores

    }
    
    const mejoresClientes = () => {

        let nuevos_clientes = []

        clientes.map( (mejor_cliente, index) => {
            return nuevos_clientes[index] = {
                ...mejor_cliente.cliente[0],
                total: mejor_cliente.total
            }
        })

        return nuevos_clientes

    }

    return {
        mejores_vendedores: mejoresVendedores(),
        mejores_clientes: mejoresClientes()
    }

}

export default useDashboard