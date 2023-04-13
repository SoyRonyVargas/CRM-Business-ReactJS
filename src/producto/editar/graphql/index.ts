import { gql } from "@apollo/client";

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto( $input:ActualizarProducto )
    {
        actualizarProducto( input:$input ){
            id
            nombre
            existencias
        }
    }
`