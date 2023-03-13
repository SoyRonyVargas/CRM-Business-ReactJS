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

export const OBTENER_PRODUCTO = gql`
    query obtenerProducto( $input:String! )
    {
        obtenerProducto(input: $input) {
            id
            nombre
            imagen
            descripcion
            status
            precio
            existencias
        }
    }
`

export const CREAR_PRODUCTO = gql`
   mutation crearProducto( $input:CrearProducto! )
    {
        crearProducto( input:$input ){
            id
            nombre
            creado
        }
    }
`

export const QUERY_PRODUCTOS = gql`
    query obtenerProductos($input: QueryProductos!) {
        obtenerProductos(input:$input){
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

