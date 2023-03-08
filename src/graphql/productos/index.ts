import { gql } from "@apollo/client";

export const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            creado
            descripcion
            existencias
            nombre
            id
            imagen
            status
            precio
        }
    }
`
