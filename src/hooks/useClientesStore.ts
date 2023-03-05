import { CREAR_CLIENTE, OBTENER_CLIENTES } from '../graphql/movimientos/clientes'
import { Cliente, ClienteLight, CrearCliente, WrapperQuery } from '../types'
import { useLazyQuery , useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useClientesStore = () => {
    
    const [ obtenerClientes , { loading } ] = useLazyQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES)
    const [ loadingCreateCliente , setLoadingCreateCliente ] = useState<boolean>(false)
    const [ crearCliente ] = useMutation<ClienteLight>(CREAR_CLIENTE)
    const [ clientes , setClientes ] = useState<Cliente[]>([])
    const [ error , setError ] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleObtenerClientes = async () => {

        try
        {
            
            const { data } = await obtenerClientes()

            setClientes(() => data.obtenerClientesVendedor)

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
        clientes,
        loading,
        handleCreateCliente,
        loadingCreateCliente,
        handleObtenerClientes,
    }

}

export default useClientesStore