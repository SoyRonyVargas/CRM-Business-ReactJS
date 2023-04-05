import { Carrito, WrapperQuery , Cliente, ConceptoCarritoLight, StateCarrito, CrearOrdenVenta } from '../types'
import { CREAR_ORDEN_VENTA, OBTENER_CARRITO, REMOVER_CONCEPTO_CARRITO } from '../graphql/carrito'
import { OBTENER_CLIENTES_VENDEDOR } from '../graphql/movimientos/clientes'
import { useLazyQuery, useMutation } from '@apollo/client'
import { updateDeleteConcepto } from '../cache/carrito'
import { parseCantidad } from '../utils/parseCantidad'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useState } from 'react'
import Swal from 'sweetalert2'

const useCarrito = () => {

    const [ loading , setLoading ] = useState(false)

    const [ handleCrearOrdenVenta ] = useMutation<WrapperQuery<ConceptoCarritoLight>>( CREAR_ORDEN_VENTA );

    const handleGuardarOrdenVenta = async ( values: StateCarrito ) => {

        try
        {

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
            debugger
        }

    }

    const { values , handleChange , handleSubmit } = useFormik<StateCarrito>({
        initialValues: {
          titulo_venta: "",
          seleccion: "",
          nombre_cliente: ""
        },
        onSubmit: handleGuardarOrdenVenta,
    });

    // APOLLO
    const [ obtenerClientesVendedor , { data: data_clientes , refetch: handleBuscarClientes } ] = useLazyQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES_VENDEDOR, {
        variables: {
            input: {
                nombre: values.nombre_cliente
            }
        },
    });
    
    const [ handleDeleteConcepto ] = useMutation<WrapperQuery<ConceptoCarritoLight>>(REMOVER_CONCEPTO_CARRITO, {
        update: updateDeleteConcepto
    });

    const [ handleGetCarrito , { data: _conceptos , refetch } ] = useLazyQuery<WrapperQuery<Carrito>>(OBTENER_CARRITO);
    const conceptos = _conceptos?.obtenerCarrito?.conceptos || []

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
        
        await obtenerClientesVendedor()

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
        values,
        loading,
        conceptos,
        handleChange,
        orden: {
            importe: calcularImporteOrden(),
            iva: calcularIVAOrden(),
            total: calcularTotalOrden()
        },
        buscador: {
            cliente: {
                handleBuscarClientes: () => handleBuscarClientes()
            }
        },
        clientes: mapClientes(data_clientes?.obtenerClientesVendedor || []),
        handleObtenerCarrito,
        handleRemoverConcepto,
        handleGuardarOrdenVenta: handleSubmit
    }
  
}

export default useCarrito
