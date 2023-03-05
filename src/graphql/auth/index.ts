import { gql } from "@apollo/client";

export const GET_PRODUCTOS = gql`
  query obtenerProductosxx {
    obtenerProductos {
        creado
        descripcion
        existencias
        nombre
        id
    }
}`

export const AUTH_LOGIN_USER = gql`
    mutation authUsuario( $input : AuthUsuario )
    {
    authUsuario( input: $input ){
        token
    }
    }
`;

export const AUTH_OBTENER_USUARIO = gql`
    query obtenerUsuario( $input : String! ){
        obtenerUsuario( input: $input ){
            id
            apellidos
            email
            nombre
        }
    }
`;