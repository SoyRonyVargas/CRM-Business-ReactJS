import { OBTENER_PRODUCTO } from '../graphql/productos'
import { Producto, WrapperQuery } from '../types'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { FormikConfig, useFormik } from 'formik'

const useFichaProducto = () => {

    const { id } = useParams<"id">()
    
    type Values = {
        cantidad: number
    }

    const [ agregarCarrito ] = useMutation();

    const formik = useFormik<Values>({
        initialValues: {
            cantidad: 0,
        },
        onSubmit: ( values : Values ) => {

            if( values.cantidad > producto?.existencias )
            {
                
                formik.setFieldError('cantidad', "Existencias insuficientes")                
                
                return;

            }

        }
    })

    const { loading , data : _producto } = useQuery<WrapperQuery<Producto>>(OBTENER_PRODUCTO , {
        variables: {
            input: id
        }
    })

    const producto = _producto?.obtenerProducto || null

    return {
        producto,
        loading,
        x: formik
    }

}

export default useFichaProducto
