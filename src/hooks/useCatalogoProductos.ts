import { Producto, QueryProductos, WrapperQuery } from '../types'
import { QUERY_PRODUCTOS } from '../graphql/productos'
import { useLazyQuery } from '@apollo/client'
import { useState , useEffect } from 'react'
import useListQuery from './useListQuery'
import { useFormik } from 'formik'

const useCatalogoProductos = () => {
  
    const [ productos , setProductos ] = useState<Producto[]>([])
    const [ loading , setLoading ] = useState(false)

    const { busqueda } = useListQuery()

    const queryProductos : QueryProductos = {
        nombre: "",
        precio: 0,
        status: 0,
        pagina: 0
    }

    const handleSubmitQuery = async ( values : QueryProductos ) => {

        setLoading(true)

        values.status = Number(values.status)

        const { data , error } = await buscarProductos({
            variables: {
                input: values
            }
        })

        if( error ) return

        await new Promise(resolve => setTimeout(resolve, 700));

        setProductos(data?.obtenerProductos)

        setLoading(false)

    }

    const { values , handleChange , handleSubmit } = useFormik({
          initialValues: queryProductos,
          onSubmit: handleSubmitQuery
    })

    const [ buscarProductos ] = useLazyQuery<WrapperQuery<Producto[]>>(QUERY_PRODUCTOS, {
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