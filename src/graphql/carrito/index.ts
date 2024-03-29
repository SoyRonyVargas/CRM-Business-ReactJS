import { gql } from "@apollo/client";

export const AGREGAR_CONCEPTO_CARRITO = gql`
    mutation agregarConceptoCarrito( $input: ConceptoOrden ){
        agregarConceptoCarrito(input:$input) {
            id
            cantidad
            importe
            total
            producto 
            usuario
        }
    }
`

export const OBTENER_TOTAL_CARRITO = gql`
    query obtenerNavbarCarrito {
        obtenerNavbarCarrito
    }
`

export const OBTENER_CARRITO = gql`
    query obtenerCarrito {
        obtenerCarrito {
            conceptos {
                id
                cantidad
                importe
                total
                iva
                usuario {
                    id
                    nombre
                }
                producto {
                    id
                    nombre
                    descripcion
                    imagen
                }
            }
        }
    }
`

export const REMOVER_CONCEPTO_CARRITO = gql`
    mutation removerConceptoCarrito( $input:ID! )
    {
        removerConceptoCarrito( input: $input )
        {
            id
            producto
            usuario
        }
    }
`

export const CREAR_ORDEN_VENTA = gql`
    mutation crearOrdenVenta($input:CrearOrdenVenta){
        crearOrdenVenta( input:$input)
    }
`
