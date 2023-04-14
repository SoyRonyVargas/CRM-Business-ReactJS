import { Carrito, WrapperQuery , Cliente, ConceptoCarritoLight, StateCarrito, CrearOrdenVenta } from '../../../types'
import { CREAR_ORDEN_VENTA, OBTENER_CARRITO, REMOVER_CONCEPTO_CARRITO } from '../../../graphql/carrito'
import { OBTENER_CLIENTES_VENDEDOR } from '../../../graphql/movimientos/clientes'
import { updateDeleteConcepto } from '../../../cache/carrito'
import { parseCantidad } from '../../../utils/parseCantidad'
import { useLazyQuery, useMutation } from '@apollo/client'
import { createOrdenVentaSchema } from '../validations'
import { useEffect, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'

const useCarrito = () => {

    const [ loading , setLoading ] = useState(false)

    const [ handleCrearOrdenVenta ] = useMutation<WrapperQuery<ConceptoCarritoLight>>( CREAR_ORDEN_VENTA );

    const handleGuardarOrdenVenta = async ( values: StateCarrito ) => {

        try
        {

            if( conceptos.length == 0 ) 
            {
                
                Swal.fire({
                    icon: "error",
                    title: "Ingresa al menos un concepto"
                })
                
                return;

            }

            setLoading(true)

            const _conceptos : ConceptoCarritoLight[] = conceptos.map( ({ usuario, id, ...concepto }) => ({
                ...concepto,
                producto: concepto.producto.id,
                concepto_carrito: id
            }))

            const orden : CrearOrdenVenta = {
                titulo_venta: values.titulo_venta,
                cliente: values.seleccion,
                conceptos: _conceptos
            }

            const { errors } = await handleCrearOrdenVenta({
                variables: {
                    input: orden
                }
            })

            if( errors ){
                return toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }

            toast.success("Orden creada correctamente", {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setLoading(false)

        }
        catch(err)
        {
            
            toast.warning("Erro al crear la orden de venta", {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setLoading(false)
            debugger
        }

    }

    const { 
        resetForm,
        getFieldProps,
        isValidating,
        setValues,
        // setSubmitting,
        // setErrors,
        setFieldValue, 
        // setFieldError,
        // setFieldTouched,
        handleChange, 
        handleSubmit,
        values,
        errors ,
    } = useFormik<StateCarrito>({
        initialValues: {
          titulo_venta: "",
          seleccion: "",
          nombre_cliente: ""
        },
        onSubmit: handleGuardarOrdenVenta,
        validationSchema: createOrdenVentaSchema,
    });

    // APOLLO
    const [ obtenerClientesVendedor ] = useLazyQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES_VENDEDOR, {
        fetchPolicy: "no-cache",
        variables: {
            input: {
                nombre: ""
            }
        },
    });

    const [ clientes , setClientes ] = useState<Cliente[]>([]);
    
    const [ handleDeleteConcepto ] = useMutation<WrapperQuery<ConceptoCarritoLight>>(REMOVER_CONCEPTO_CARRITO, {
        update: updateDeleteConcepto
    });

    const [ handleGetCarrito , { data: _conceptos , refetch } ] = useLazyQuery<WrapperQuery<Carrito>>(OBTENER_CARRITO , {
        fetchPolicy: "no-cache",
    });
    const conceptos = _conceptos?.obtenerCarrito?.conceptos || []

    useEffect( () => {

        handleBuscarClientes()
        // .then( () => {
        //     setSubmitting(false)
        //     setErrors({
        //         titulo_venta: null
        //     })
        //     setFieldError('titulo_venta' , null)
        //     setFieldTouched("titulo_venta" , false)
        // });

        // handleObtenerCarrito();

        

    }, [])

    const handleBuscarClientes = async () => {

        try
        {

            const { data } = await obtenerClientesVendedor({
                variables: {
                    input: {
                        nombre: values.nombre_cliente
                    }
                }
            })

            const clientes : Cliente[] = data?.obtenerClientesVendedor || [];

            const primer_cliente : Cliente = clientes[0]

            if( clientes.length > 0 )
            {
                setFieldValue( "seleccion" , primer_cliente.id , false)
                // setValues({
                //     ...values,
                //     seleccion: primer_cliente.id
                // })
            }
            else
            {
                setFieldValue( "seleccion" , "" , false)
                // setValues({
                //     ...values,
                //     seleccion: ""
                // })
                // setFieldValue( "seleccion" , "" )
            }
            
            setClientes(clientes)

            // setErrors({
            //     titulo_venta: null
            // })

            // setFieldTouched("titulo_venta" , false)

            // setFieldError('titulo_venta' , null)

            // resetForm()

            errors

            debugger

        }
        catch(err)
        {
            alert("")
            debugger
        }

    }
    
    const calcularImporteOrden = () => {

        let importe = 0;

        for( let concepto of conceptos )
        {
            importe += concepto.importe;
        }

        return parseCantidad(importe);

    }
    
    const calcularIVAOrden = () => {

        let iva = 0;

        for( let concepto of conceptos )
        {
            iva += concepto.iva;
        }

        return parseCantidad(iva);

    }
    
    const calcularTotalOrden = () => {

        let total = 0;

        for( let concepto of conceptos )
        {
            total += concepto.total;
        }

        return parseCantidad(total);

    }

    const handleObtenerCarrito = async () => {
        
        setLoading(true)
        
        await handleGetCarrito()
        
        setLoading(false)

    }

    const handleRemoverConcepto = async ( id: string ) => {

        const { isConfirmed } = await Swal.fire({
            title: '¿Quieres eliminar el concepto del carrito?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: `Cancelar`,
        })

        if( !isConfirmed ) return

        const { data , errors } = await handleDeleteConcepto({
            variables: {
                input: id
            }
        })
        
        if( errors ) {
            return
        }
        
        if( data.removerConceptoCarrito )
        {
            await handleObtenerCarrito()
        }

    }

    const mapClientes = ( data : Cliente[] ) => {

        return data.map( cliente => ({
            label: `${cliente.nombre} ${cliente.apellido} (${cliente.rfc})`,
            value: cliente.id
        }))

    }

    return {
        errors,
        values,
        loading,
        conceptos,
        enviado: isValidating,
        handleChange,
        orden: {
            importe: calcularImporteOrden(),
            iva: calcularIVAOrden(),
            total: calcularTotalOrden()
        },
        buscador: {
            cliente: {
                handleBuscarClientes
            }
        },
        getFieldProps,
        clientes: mapClientes(clientes),
        handleObtenerCarrito,
        handleRemoverConcepto,
        handleGuardarOrdenVenta: handleSubmit
    }
  
}

export default useCarrito
