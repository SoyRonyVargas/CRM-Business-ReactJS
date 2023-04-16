import { ACTUALIZAR_CLIENTE, CREAR_CLIENTE, ELIMINAR_CLIENTE, OBTENER_CLIENTES } from '../graphql/movimientos/clientes'
import { ActualizarCliente, Cliente, ClienteLight, CrearCliente, WrapperQuery } from '../types'
import { ApolloCache, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Swal from 'sweetalert2'

const useClientesStore = () => {
    
    const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE)
    const [ loadingDelete , setLoadingDelete ] = useState(false)
    const [ loadingEdit , setLoadingEdit ] = useState(false)
    
    const [ crearCliente ] = useMutation<ClienteLight>(CREAR_CLIENTE)
    
    const [ eliminarUsuario ] = useMutation<WrapperQuery<string>>(ELIMINAR_CLIENTE , {
        update: ( cache : ApolloCache<any> , { data }) => {
            
            debugger

            const { obtenerClientesVendedor } : WrapperQuery<Cliente[]> = cache.readQuery({ query: OBTENER_CLIENTES })

            const clientes = obtenerClientesVendedor.filter( cliente => cliente.id !== data?.eliminarCliente )

            cache.writeQuery({
                query: OBTENER_CLIENTES,
                data: {
                    obtenerClientesVendedor: clientes
                }
            })

        }
    })

    const handleDeleteCliente = async ( cliente : Cliente ) => {

        const { isConfirmed } = await Swal.fire({
            title: `¿Quieres eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
            text: "Se eliminara permanetemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3E54AC',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Eliminar'
        })

        if( !isConfirmed ) return;

        setLoadingDelete(true)
        
        await eliminarUsuario({
            variables: {
                input: cliente.id
            }
        })
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoadingDelete(false)

        toast.success("Cliente eliminado correctamente", {
            position: toast.POSITION.BOTTOM_CENTER
        });

    }
    
    const [ error , setError ] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleActualizarCliente = async ( cliente : ActualizarCliente ) => {

        try
        {
            
            setLoadingEdit(true)
            
            await actualizarCliente({
                variables: {
                    input: cliente
                }
            })

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoadingEdit(false)

            toast.success("Cliente actualizado correctamente", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            
        }
        catch(err)
        {
            setLoadingEdit(false)
        }

    }

    const handleCreateCliente = async ( cliente : CrearCliente ) => {

        try
        {

            setLoadingEdit(true)
            
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
                
                setLoadingEdit(false)

                toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                
                return setError(errors[0].message)

            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoadingEdit(false)

            navigate("/movimientos/clientes")

            toast.success("Cliente creado correctamente", {
                position: toast.POSITION.BOTTOM_CENTER
            });

            console.log(data)

        }
        catch(err)
        {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoadingEdit(false)
            
            toast.error( err.message , {
                position: toast.POSITION.BOTTOM_CENTER
            });

        }

    }

    return {
        error,
        loading: loadingEdit,
        loading_del: loadingDelete,
        edit: {
            loading: loadingEdit,
            handleActualizarCliente
        },
        handleCreateCliente,
        handleDeleteCliente
    }

}

export default useClientesStore