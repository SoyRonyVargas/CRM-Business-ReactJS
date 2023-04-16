import { gql } from "@apollo/client";

export const REMOVER_PRODUCTO = gql`
    mutation eliminarProducto( $input:String! )
    {
    eliminarProducto( input: $input )
    }
`