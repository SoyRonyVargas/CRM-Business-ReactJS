import { ACTUALIZAR_CLIENTE, CREAR_CLIENTE, OBTENER_CLIENTES } from '../graphql/movimientos/clientes'
import { ApolloCache, useMutation, useQuery } from '@apollo/client'
import { ActualizarCliente, Cliente, ClienteLight, CrearCliente, WrapperQuery } from '../types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

type Cache = {
    
}

const useClientesStore = () => {
    
    const [ loadingCreateCliente , setLoadingCreateCliente ] = useState<boolean>(false)
    const { loading , data }  = useQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES)
    const [ actualizarCliente, { loading : load_edit_cliente } ] = useMutation(ACTUALIZAR_CLIENTE)

    const [ crearCliente ] = useMutation<ClienteLight>(CREAR_CLIENTE , {
        update: ( cache : ApolloCache<any> , { data }) => {
            
            const { obtenerClientesVendedor } : WrapperQuery<Cliente[]> = cache.readQuery({ query: OBTENER_CLIENTES })

            let clientes = [
                ...obtenerClientesVendedor,
                data
            ]

            cache.writeQuery({
                query: OBTENER_CLIENTES,
                data: {
                    clientes: clientes,
                    obtenerClientesVendedor: clientes
                }
            })

            return clientes

        }
    })
    
    const [ error , setError ] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleActualizarCliente = async ( cliente : ActualizarCliente ) => {

        try
        {
            
            await actualizarCliente({
                variables: {
                    input: cliente
                }
            })

        }
        catch(err)
        {

        }

    }

    const handleObtenerClientes = async () => {

        try
        {
            
            // const { data } = await obtenerClientes()

            // setClientes(() => data.obtenerClientesVendedor)

        }
        catch(err)
        {

        }

    }

    const handleCreateCliente = async ( cliente : CrearCliente ) => {

        try
        {

            setLoadingCreateCliente(true)
            
            const { data , errors } = await crearCliente({
                variables: {
                    input: cliente
                }
            })

            if( errors )
            {
                throw new Error()
            }

            if( errors ) {
                
                setLoadingCreateCliente(false)

                debugger

                toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                
                return setError(errors[0].message)

            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoadingCreateCliente(false)

            navigate("/movimientos/clientes")

            toast.success("Cliente creado correctamente", {
                position: toast.POSITION.BOTTOM_CENTER
            });

            console.log(data)

        }
        catch(err)
        {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoadingCreateCliente(false)
            
            toast.error( err.message , {
                position: toast.POSITION.BOTTOM_CENTER
            });

        }

    }

    return {
        error,
        clientes: data?.obtenerClientesVendedor || [],
        loading,
        edit: {
            // cliente: cliente,
            loading: load_edit_cliente,
            handleActualizarCliente
        },
        handleCreateCliente,
        loadingCreateCliente,
        handleObtenerClientes,
    }

}

export default useClientesStore