import { Carrito, WrapperQuery , Cliente, ConceptoCarritoLight, StateCarrito, CrearOrdenVenta, ConceptoCarrito } from '../../../types'
import { CREAR_ORDEN_VENTA, OBTENER_CARRITO, REMOVER_CONCEPTO_CARRITO } from '../../../graphql/carrito'
import { OBTENER_CLIENTES_VENDEDOR } from '../../../graphql/movimientos/clientes'
import { parseCantidad } from '../../../utils/parseCantidad'
import { useLazyQuery, useMutation } from '@apollo/client'
import { createOrdenVentaSchema } from '../validations'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useCarrito = () => {

    const navigate = useNavigate()

    const [ loading , setLoading ] = useState(false)

    const [ handleCrearOrdenVenta ] = useMutation<WrapperQuery<string>>( CREAR_ORDEN_VENTA );

    const handleGuardarOrdenVenta = async ( values: StateCarrito ) => {

        try
        {

            if( carrito.length == 0 ) 
            {
                
                Swal.fire({
                    icon: "error",
                    title: "Ingresa al menos un concepto"
                })
                
                return;

            }

            setLoading(true)

            const _conceptos : ConceptoCarritoLight[] = carrito.map( ({ usuario, id, ...concepto }) => ({
                ...concepto,
                producto: concepto.producto.id,
                concepto_carrito: id
            }))

            const orden : CrearOrdenVenta = {
                titulo_venta: values.titulo_venta,
                cliente: values.seleccion,
                conceptos: _conceptos
            }

            const { errors , data } = await handleCrearOrdenVenta({
                variables: {
                    input: orden
                }
            })

            if( errors ){
                return toast.error( errors[0].message , {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }

            const id : string = data?.crearOrdenVenta;

            debugger

            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Orden creada correctamente", {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setLoading(false)

            const ruta = `/movimientos/ventas/edit/${id}`

            navigate(ruta)

        }
        catch(err)
        {
            
            toast.warning("Erro al crear la orden de venta", {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setLoading(false)
        }

    }

    const { 
        getFieldProps,
        isValidating,
        setFieldValue, 
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
        fetchPolicy: 'network-only',
        variables: {
            input: {
                nombre: ""
            }
        },
    });

    const [ clientes , setClientes ] = useState<Cliente[]>([]);
    
    const [ handleDeleteConcepto ] = useMutation<WrapperQuery<ConceptoCarritoLight>>(REMOVER_CONCEPTO_CARRITO, {
        fetchPolicy: 'network-only',
    });

    const [ handleGetCarrito ] = useLazyQuery<WrapperQuery<Carrito>>(OBTENER_CARRITO , {
        fetchPolicy: 'network-only',
    });

    const [ carrito , setCarrito ] = useState<ConceptoCarrito[]>([])
    
    useEffect( () => {

        handleBuscarClientes()
     
        handleObtenerCarrito();

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
            }
            else
            {
                setFieldValue( "seleccion" , "" , false)
            }
            
            setClientes(clientes)

        }
        catch(err)
        {
        }

    }
    
    const calcularImporteOrden = () => {

        let importe = 0;

        for( let concepto of carrito )
        {
            importe += concepto.importe;
        }

        return parseCantidad(importe);

    }
    
    const calcularIVAOrden = () => {

        let iva = 0;

        for( let concepto of carrito )
        {
            iva += concepto.iva;
        }

        return parseCantidad(iva);

    }
    
    const calcularTotalOrden = () => {

        let total = 0;

        for( let concepto of carrito )
        {
            total += concepto.total;
        }

        return parseCantidad(total);

    }

    const importe = useMemo(() => calcularImporteOrden, [carrito]);
    const total = useMemo(() => calcularTotalOrden, [carrito]);
    const iva = useMemo(() => calcularIVAOrden, [carrito]);

    const handleObtenerCarrito = async () => {
        
        setLoading(true)
        
        const { data, error } = await handleGetCarrito()
        
        if( error )
        {
            return;
        }

        const conceptos = data.obtenerCarrito.conceptos

        setCarrito(conceptos)

        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false)

    }

    const handleRemoverConcepto = async ( id: string ) => {

        try
        {
            const { isConfirmed } = await Swal.fire({
                title: '¿Quieres eliminar el concepto del carrito?',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: `Cancelar`,
            })
    
            if( !isConfirmed ) return
    
            const { errors } = await handleDeleteConcepto({
                variables: {
                    input: id
                }
            })
            
            if( errors ) {
                return
            }
    
            const conceptos_nuevos = carrito.filter( concepto => concepto.id !== id )
            
            setCarrito(conceptos_nuevos);
            
        }
        catch
        {
            alert("error")
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
        conceptos: [...carrito],
        carrito,
        enviado: isValidating,
        handleChange,
        orden: {
            importe: importe(),
            total: total(),
            iva: iva(),
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
    };
  
}

export type HCarrito = {
    
}

export default useCarrito
