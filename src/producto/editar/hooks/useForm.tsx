import { Producto, ProductoLight, WrapperQuery } from '../../../types'
import { OBTENER_PRODUCTO } from '../../../graphql/productos'
import { useMutation, useQuery } from '@apollo/client'
import { actualizarProductoCache } from '../cache'
import { ACTUALIZAR_PRODUCTO } from '../graphql'
import { useParams } from 'react-router-dom'
import { HEditProducto } from '../types'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useState } from 'react'
import axiosInstance from '../../../config/axios'

const useForm = () : HEditProducto => {

    const { id } = useParams<"id">()

    const [preview, setPreview] = useState([])

    const { data: producto } = useQuery<WrapperQuery<Producto>>(OBTENER_PRODUCTO, {
        variables: {
            input: id
        },
        onCompleted(data) {
            setPreview(data.obtenerProducto.imagen)
        },
    })

    const [ loading, setLoading ] = useState(false)
    
    const [ actualizarProducto ] = useMutation<WrapperQuery<ProductoLight>>( ACTUALIZAR_PRODUCTO , {
        update: actualizarProductoCache
    })

    const handleRemoveImagen = ( imagen: string ) => {

        const imagenes = values.imagen.filter( img => img != imagen )

        setFieldValue('imagen' , imagenes)

    }

    const handleActualizarProducto = async ( producto : Producto ) => {

        try
        {

            setLoading(true)
            
            const producto_actualizar : Producto = {
                ...producto,
            }

            producto_actualizar.status = Number(producto_actualizar.status)

            const { errors } = await actualizarProducto({
                variables: {
                    input: producto_actualizar,
                }
            })

            if( errors ) {
                
                setLoading(false)

                toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                
                return;

            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setLoading(false)

            // navigate("/movimientos/productos")

            toast.success("Producto creado correctamente", {
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

    const handleDrop = async ( acceptedFiles:any[] ) => {

        if (acceptedFiles.length == 0) return

        try
        {

            const imagenes = new FormData()
                    
            imagenes.append("imagenes" , acceptedFiles[0])
            
            const { data: response } = await axiosInstance.
                post<string[]>('/upload', imagenes)
            
            const nueva_imagen = response[0]
            
            setPreview([
                ...preview,
                nueva_imagen
            ])

            setFieldValue("imagen", values.imagen.concat(nueva_imagen))

            debugger

        }
        catch
        {

        }

    }

    const {
        getFieldProps,
        setFieldValue,
        handleSubmit,
        errors,
        values,
    } = useFormik({
        initialValues: producto?.obtenerProducto,
        // validationSchema: createProductoSchema,
        enableReinitialize: true,
        onSubmit: handleActualizarProducto
    })

    return {
        handleActualizarProducto,
        handleRemoveImagen,
        getFieldProps,
        setFieldValue,
        handleSubmit,
        handleDrop,
        loading,
        values,
        errors,
    }
}

export default useForm