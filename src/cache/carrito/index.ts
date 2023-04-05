import { Carrito, ConceptoCarritoLight, WrapperQuery } from "../../types"
import { OBTENER_CARRITO } from "../../graphql/carrito"
import { ApolloCache } from "@apollo/client"

type DataUpdateQuery<T> = {
    data: T
}

export const updateDeleteConcepto = ( cache : ApolloCache<any> , { data }: DataUpdateQuery<WrapperQuery<ConceptoCarritoLight>> ) => {

    const { removerConceptoCarrito : concepto } = data
    
    const { obtenerCarrito } : WrapperQuery<Carrito> = cache.readQuery({ query: OBTENER_CARRITO })

    let clientesFiltrado = obtenerCarrito.conceptos.filter( cliente => cliente.id != concepto.id )

    cache.writeQuery({
        query: OBTENER_CARRITO,
        data: {
            clientes: clientesFiltrado,
            obtenerCarrito: clientesFiltrado
        }
    })

    return clientesFiltrado

}