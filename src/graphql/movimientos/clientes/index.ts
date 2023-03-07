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
            fecha_nacimiento
            rfc
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

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente( $input: ActualizarCliente ){
        actualizarCliente( input: $input ){
            id
        }
    }
`
