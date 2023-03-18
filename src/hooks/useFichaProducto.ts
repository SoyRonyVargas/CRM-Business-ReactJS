import { Producto, ValuesFicha, WrapperQuery } from '../types'
import { AGREGAR_CONCEPTO_CARRITO } from '../graphql/carrito'
import { OBTENER_PRODUCTO } from '../graphql/productos'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useFichaProducto = () => {

    const [ loading_create , setLoading ] = useState(false);

    const { id } = useParams<"id">()

    const { loading , data : _producto } = useQuery<WrapperQuery<Producto>>(OBTENER_PRODUCTO , {
        variables: {
            input: id
        }
    })
    
    const [ handleAgregarConceptoCarrito ] = useMutation<WrapperQuery<any>>( AGREGAR_CONCEPTO_CARRITO )

    const producto = _producto?.obtenerProducto || null

    const onSubmit = async ( values : ValuesFicha ) => {

        try
        {
            alert("enviado")

            setLoading(true)

            debugger
            
            const { data , errors } = await handleAgregarConceptoCarrito({
                variables: {
                    input: {
                        cantidad: values.cantidad,
                        producto: id,
                        importe: 1,
                        total: 1
                    }
                }
            })
            
            setLoading(false)

            if( errors ){
                toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                return;
            }
        }
        catch(err)
        {
            debugger

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoading(false)
            
            toast.error( err.message , {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }

    }

    return {
        loading_create,
        producto,
        loading,
        onSubmit
    }

}

export default useFichaProducto
