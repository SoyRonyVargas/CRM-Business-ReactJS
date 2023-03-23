import { OBTENER_CARRITO } from "../../graphql/carrito"
import { ApolloCache } from "@apollo/client"

export const updateDeleteConcepto = ( cache : ApolloCache<any> , { data }) => {
            
    // const { obtenerClientesVendedor } : WrapperQuery<Cliente[]> = cache.readQuery({ query: OBTENER_PRODUCTOS })

    let clientes = [
        // ...obtenerClientesVendedor,
        data
    ]

    cache.writeQuery({
        query: OBTENER_CARRITO,
        data: {
            clientes: clientes,
            obtenerCarrito: clientes
        }
    })

    return clientes

}