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
