import { OBTENER_PRODUCTO } from '../graphql/productos'
import { Producto, WrapperQuery } from '../types'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { FormikConfig, useFormik } from 'formik'

const useFichaProducto = () => {

    const { id } = useParams<"id">()
    const formik = useFormik<{ cantidad: number }>({
        initialValues: {
            cantidad: 0,
        },
        // onSubmit: handleSubmit
    })
    const { loading , data : _producto } = useQuery<WrapperQuery<Producto>>(OBTENER_PRODUCTO , {
        variables: {
            input: id
        }
    })

    const producto = _producto?.obtenerProducto || null

    const handleSubmit = async () => {

        if( formik.values.cantidad > producto?.existencias )
        {
            return formik.setFieldError("cantidad", "Cantidad insuficiente")
        }

    }

   

    return {
        producto,
        loading,
        x: formik
    }

}

export default useFichaProducto
