import { gql } from "@apollo/client";

export const OBTENER_CLIENTES = gql`
    query {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            creado
            vendedor {
            id
            nombre
            }
        }
    }
`
