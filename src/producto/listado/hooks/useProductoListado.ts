import { OBTENER_PRODUCTOS } from '../../../graphql/productos'
import { Producto, WrapperQuery } from '../../../types'
import useListQuery from '../../../hooks/useListQuery'
import { useMutation, useQuery } from '@apollo/client'
import { REMOVER_PRODUCTO } from '../graphql'
import { useState } from 'react'
import Swal from 'sweetalert2'

const useProductoListado = () => {
    
    const { busqueda } = useListQuery()

    const { data , loading , refetch } = useQuery<WrapperQuery<Producto[]>>(OBTENER_PRODUCTOS , {
        fetchPolicy: "network-only",
        variables: {
            input: {
                pagina: busqueda.pagina,
                status: 0
            }
        }
    })

    const [ loading_remover , setLoadingRemover ] = useState<boolean>(false) 
    const [ removerConcepto ] = useMutation(REMOVER_PRODUCTO)

    const productos = data?.obtenerProductos || []

    const handleRemoveConcepto = async ( id: string ) => {

        const { isConfirmed } = await Swal.fire({
            title: `¿Quieres eliminar el producto?`,
            text: "Se eliminara permanetemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3E54AC',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Eliminar'
        })

        if( !isConfirmed ) return;

        setLoadingRemover(true)

        const { errors } = await removerConcepto({
            variables: {
                input: id
            }
        })

        if( errors )
        {
            
            Swal.fire({
                title: "Error al eliminar el producto",
                icon: "error"
            })
            
            return;

        }

        Swal.fire({
            title: "Producto eliminado correctamente",
            icon: "success"
        })

        await refetch()

        setLoadingRemover(false)

    }

    return {
        handleRemoveConcepto,
        productos,
        loading,
        busqueda,
    }
}

export default useProductoListado