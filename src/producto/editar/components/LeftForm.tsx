import { FormEditContext } from "../context/FormEditContext";
import React, { useContext } from 'react';
import CIcon from "@coreui/icons-react";
import { cilSave } from "@coreui/icons";
import { Field } from "formik";
import {
    CFormTextarea,
    CCardHeader,
    CFormInput,
    CCardBody,
    CSpinner,
    CButton,
    CCard,
    CCol,
    CRow,
} from "@coreui/react";

const LeftForm = () => {

    const {
        getFieldProps,
        handleSubmit,
        loading,
        errors,
        values
    } = useContext(FormEditContext)

    return (
        <form className="h-100" onSubmit={handleSubmit}>
            <CCard className="h-100">
                <CCardHeader>
                    <strong>Producto Nuevo</strong>
                </CCardHeader>
                <CCardBody>
                    {/* <pre>{JSON.stringify(values, null, 3)}</pre>
                    <pre>{JSON.stringify(errors, null, 3)}</pre> */}
                    <CRow>
                        <CCol xs={12}>

                            <CFormInput
                                feedbackInvalid={errors.nombre ? `${errors.nombre}` : null}
                                className={`${errors.nombre ? "is-invalid" : ""} mb-2`}
                                placeholder="Nombre del producto..."
                                {...getFieldProps("nombre")}
                                disabled={loading}
                                autoComplete={null}
                                label="Nombre"
                                name="nombre"
                                type="text"
                            />

                            <CFormTextarea
                                feedbackInvalid={
                                    errors.descripcion ? `${errors.descripcion}` : null
                                }
                                className={`${errors.descripcion ? "is-invalid" : ""} mb-2`}
                                placeholder="Descripcion del producto..."
                                {...getFieldProps("descripcion")}
                                autoComplete={"none"}
                                disabled={loading}
                                label="Descripción"
                                name="descripcion"
                                style={{
                                    minHeight: "100px",
                                }}
                            />

                            <CFormInput
                                feedbackInvalid={errors.nombre ? `${errors.nombre}` : null}
                                className={`${errors.nombre ? "is-invalid" : ""} mb-2`}
                                placeholder="Precio del producto..."
                                {...getFieldProps("precio")}
                                autoComplete={"none"}
                                disabled={loading}
                                label="Precio"
                                name="precio"
                                type="number"
                            />

                            <CFormInput
                                feedbackInvalid={errors.nombre ? `${errors.nombre}` : null}
                                className={`${errors.nombre ? "is-invalid" : ""} mb-2`}
                                placeholder="Existencias del producto..."
                                {...getFieldProps("existencias")}
                                autoComplete={"none"}
                                disabled={loading}
                                label="Existencias"
                                name="existencias"
                                type="number"
                            />

                            <div className="mt-2">
                                <label className="mb-05">Estado</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    {...getFieldProps("status")}
                                >
                                    <option value={0}>Activo</option>
                                    <option value={1}>Inactivo</option>
                                    <option value={2}>Pendiente</option>
                                </select>
                            </div>
                        </CCol>
                    </CRow>
                    <hr />
                    <div className="mb- d-flex align-items-center justify-content-end">
                        <CButton
                            disabled={loading}
                            shape="rounded-0"
                            color="primary"
                            type="submit"
                        >
                            {!loading ? (
                                <>
                                    <CIcon icon={cilSave} className="mr-1" />
                                    Actualizar Producto
                                </>
                            ) : (
                                <>
                                    <CSpinner className="mr-1" size="sm" />
                                    Guardando...
                                </>
                            )}
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </form>
    )
}

export default LeftForm