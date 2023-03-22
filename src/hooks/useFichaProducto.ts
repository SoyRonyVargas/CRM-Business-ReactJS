import { Producto, ValuesFicha, WrapperQuery } from '../types'
import { AGREGAR_CONCEPTO_CARRITO } from '../graphql/carrito'
import { OBTENER_PRODUCTO } from '../graphql/productos'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
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

            setLoading(true)

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
            
            await new Promise(resolve => setTimeout(resolve, 500));

            setLoading(false)

            if( errors ){
                
                toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                
                return;

            }

            toast.success("Agregado al carrito", {
                position: toast.POSITION.BOTTOM_CENTER
            });

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
        loading: loading_create || loading,
        loading_create: false,
        producto,
        onSubmit,
    }

}

export default useFichaProducto
