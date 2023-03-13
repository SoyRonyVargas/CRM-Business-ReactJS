import { QUERY_PRODUCTOS } from '../graphql/productos'
import { useLazyQuery } from '@apollo/client'
import { Producto, QueryProductos, WrapperQuery } from '../types'
import { useState , useEffect } from 'react'
import { useFormik } from 'formik'

const useCatalogoProductos = () => {
  
    const [ productos , setProductos ] = useState<Producto[]>([])

    const queryProductos : QueryProductos = {
        nombre: "",
        pagina: 0,
        precio: 0,
        status: 0
    }

    const handleSubmitQuery = async ( values : QueryProductos ) => {

        values.status = Number(values.status)

        const { data , error } = await buscarProductos({
            variables: {
                input: values
            }
        })

        if( error ) return

        setProductos(data?.obtenerProductos)

    }

    const { values , handleChange , handleSubmit } = useFormik({
          initialValues: queryProductos,
          onSubmit: handleSubmitQuery
    })

    const [ buscarProductos , { loading } ] = useLazyQuery<WrapperQuery<Producto[]>>(QUERY_PRODUCTOS, {
        variables: {
            input: queryProductos
        }    
    })

    useEffect(() => {

        handleSubmitQuery(values)

    }, [])

    return {
        values,
        loading,
        productos,
        handleChange,
        handleSubmit
    }

}

export default useCatalogoProductos