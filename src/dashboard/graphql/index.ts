import { gql } from "@apollo/client";

export const GET_MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            total
            vendedor {
                id
                nombre
                apellidos
                email
            }
        }
    }
`

export const GET_MEJORES_CLIENTES = gql`
    query mejoresClientes {
        mejoresClientes
        {
            cliente {
                apellido
                id
                nombre
            }
            total
        }
    }
`