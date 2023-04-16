import { CButton, CCard, CCardBody, CCol, CFormInput, CRow } from '@coreui/react'
import { CarritoContext } from '../context/CarritoContext'
import React, { useContext } from 'react'

const FormBusqueda = () => {

    // const {
    //     orden,
    //     values,
    //     errors,
    //     enviado,
    //     loading,
    //     clientes,
    //     buscador,
    //     conceptos,
    //     handleChange,
    //     getFieldProps,
    //     handleGuardarOrdenVenta
    //   } = useCarrito();
    
    const {
        getFieldProps,
        handleChange,
        clientes,
        buscador,
        loading,
        errors,
        values,
    } = useContext(CarritoContext)
    
    return (
        <CCard>
            <CCardBody>

                <CRow>
                    <CCol xs={5}>
                        <CFormInput
                            disabled={loading}
                            value={values.nombre_cliente}
                            label="Nombre del cliente"
                            onChange={handleChange}
                            name="nombre_cliente"
                            type="text"
                        />
                    </CCol>
                    <CCol
                        xs={1}
                        className="d-flex justify-content-center align-items-end"
                    >
                        <CButton
                            disabled={loading}
                            color="primary"
                            onClick={buscador.cliente.handleBuscarClientes}
                        >
                            Buscar
                        </CButton>
                    </CCol>
                    <CCol xs={6}>
                        <label className="form-label">
                            Clientes
                        </label>
                        <select
                            disabled={loading}
                            className={`form-select ${errors.seleccion ? 'is-invalid' : ''}`}
                            onChange={handleChange}
                            name="seleccion"
                        >
                            {
                                clientes.map(cliente => (
                                    <option label={cliente.label} value={cliente.value}>
                                        {cliente.label}
                                    </option>
                                ))
                            }
                        </select>
                    </CCol>
                </CRow>

                <hr />

                <CRow>
                    <CCol>
                        <CFormInput
                            disabled={loading}
                            feedbackInvalid={errors.titulo_venta ? `${errors.titulo_venta}` : null}
                            className={`${errors.titulo_venta ? "is-invalid" : ""}`}
                            label="Nombre de la venta"
                            {...getFieldProps("titulo_venta")}
                            onChange={handleChange}
                            name="titulo_venta"
                            type="text"
                        />
                    </CCol>
                </CRow>

            </CCardBody>
        </CCard>
    )
}

export default FormBusqueda