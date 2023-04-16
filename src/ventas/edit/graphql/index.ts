import { gql } from "@apollo/client";

export const OBTENER_ORDEN_POR_ID = gql`
    query obtenerOrdenenId($input:ID!){
        obtenerOrdenenId( input:$input )
        {
            fecha_entrega
            titulo_venta
            creado
            status
            vendedor 
            {
              id
              nombre
            }
            cliente 
            {
              id
              nombre
            }
            id
            conceptos {
              creado
              importe
              cantidad
              total
              status
              iva
              id
              producto
              {
                id
                nombre
                imagen
              }
            }
        }
    }
`

export const ACTUALIZAR_STATUS_CONCEPTO = gql`
  mutation actualizarStatusConceptoOrdenVenta($input:InputActualizarStatus)
  {
    actualizarStatusConceptoOrdenVenta(input: $input)
  }
`
