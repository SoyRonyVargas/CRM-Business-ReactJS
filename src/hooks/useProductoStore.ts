import { CREAR_PRODUCTO, OBTENER_PRODUCTOS } from "../graphql/productos"
import { ApolloCache, useMutation } from "@apollo/client"
import { CrearProducto, ProductoLight, WrapperQuery } from "../types"
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../config/axios"

const useProductoStore = () => {
  
    const [ loading , setLoading ] = useState(false)
    const navigate = useNavigate()
    const [ crearProducto ] = useMutation<WrapperQuery<ProductoLight>>( CREAR_PRODUCTO , {
        // update: ( cache : ApolloCache<any> , { data }) => {
            
        //     // const { obtenerClientesVendedor } : WrapperQuery<Cliente[]> = cache.readQuery({ query: OBTENER_PRODUCTOS })

        //     let clientes = [
        //         ...obtenerClientesVendedor,
        //         data
        //     ]

        //     cache.writeQuery({
        //         query: OBTENER_CLIENTES,
        //         data: {
        //             clientes: clientes,
        //             obtenerClientesVendedor: clientes
        //         }
        //     })

        //     return clientes

        // }
    })

    const handleCreateProducto = async ( producto : CrearProducto ) => {

        try
        {

            setLoading(true)
            
            const imagenes = new FormData()

            for( const imagen of producto.imagen )
            {
                imagenes.append("imagenes" , imagen)
            }

            const { data: response } = await axiosInstance.post<string[]>('/upload', imagenes)
            
            producto.imagen = response

            producto.status = Number(producto.status)

            const { errors } = await crearProducto({
                variables: {
                    input: producto,
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

            navigate("/movimientos/productos")

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

    return {
        loading,
        handleCreateProducto
    }

}

export default useProductoStore