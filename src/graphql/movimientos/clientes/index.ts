import { gql } from "@apollo/client";

export const OBTENER_CLIENTES = gql`
    query {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            creado
            email
            vendedor {
            id
            nombre
            }
        }
    }
`

export const OBTENER_CLIENTE = gql`
    query($input: String!) {
        obtenerCliente(input: $input) {
            id  
            nombre
            apellido
            email
            empresa
            telefono
            vendedor {
                id
                nombre
            }
        }
    }
`

export const CREAR_CLIENTE = gql`
    mutation crearCliente( $input : CrearCliente )
    {
        crearCliente( input: $input ){
            id
            nombre
            creado
            vendedor
            apellido
        }
    }
`
