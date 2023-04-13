import { ApolloCache } from "@apollo/client"

export const actualizarProductoCache = ( cache : ApolloCache<any> , { data }) => {
            
    // const { obtenerClientesVendedor } : WrapperQuery<Cliente[]> = cache.readQuery({ query: OBTENER_PRODUCTOS })

    let clientes = [
        // ...obtenerClientesVendedor,
        data
    ]

    // cache.writeQuery({
    //     query: OBTENER_CLIENTES,
    //     data: {
    //         clientes: clientes,
    //         obtenerClientesVendedor: clientes
    //     }
    // })

    return clientes

}