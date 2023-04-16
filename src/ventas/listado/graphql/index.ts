import { gql } from "@apollo/client";

export const OBTENER_ORDENES_VENTA = gql`
    query obtenerOrdenesVenta{
        obtenerOrdenesVenta {
            id
            titulo_venta
            creado
            cliente {
                id
                nombre
            }
            importe
            total
            iva
            total_productos
        }
    }
`
