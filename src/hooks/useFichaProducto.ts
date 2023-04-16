import { Producto, ValuesFicha, WrapperQuery } from '../types'
import { AGREGAR_CONCEPTO_CARRITO } from '../graphql/carrito'
import { OBTENER_PRODUCTO } from '../graphql/productos'
import { useMutation, useQuery } from '@apollo/client'
import { parseCantidad } from '../utils/parseCantidad'
import { useParams } from 'react-router-dom'
import { IVA_GLOBAL } from '../default'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useFichaProducto = () => {

    const [ loading_create , setLoading ] = useState(false);
    
    const { id } = useParams<"id">()

    const { loading , data : _producto } = useQuery<WrapperQuery<Producto>>(OBTENER_PRODUCTO , {
        fetchPolicy: "network-only",
        variables: {
            input: id
        }
    })
    
    const [ handleAgregarConceptoCarrito ] = useMutation<WrapperQuery<any>>( AGREGAR_CONCEPTO_CARRITO )

    const producto = _producto?.obtenerProducto || null

    const [ concepto , setConcepto ] = useState({
        importe: 0,
        total: 0,
        iva: 0,
    })

    const onSubmit = async ( values : ValuesFicha ) => {

        try
        {

            setLoading(true)

            const { data , errors } = await handleAgregarConceptoCarrito({
                variables: {
                    input: {
                        cantidad: values.cantidad,
                        producto: id,
                        importe: concepto.importe,
                        total: concepto.total,
                        iva: concepto.iva
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

    const handleChangeCantidad = ( e : React.FormEvent<HTMLInputElement> ) => {

        const cantidad : number = Number(e.currentTarget.value) || 0;

        if( cantidad <= 0 )
        {
            return;
        }

        const importe = cantidad * producto.precio;

        const iva = importe * IVA_GLOBAL;

        const total = importe + iva;

        setConcepto({
            importe,
            iva,
            total
        })

    }

    return {
        handleChangeCantidad,
        loading: loading_create || loading,
        loading_create: false,
        concepto: {
            importe: parseCantidad(concepto.importe),
            total: parseCantidad(concepto.total),
            iva: parseCantidad(concepto.iva)
        },
        producto,
        onSubmit,
    }

}

export default useFichaProducto
