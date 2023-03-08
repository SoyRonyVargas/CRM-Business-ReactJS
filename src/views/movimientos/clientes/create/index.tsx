import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CRow, CSpinner } from '@coreui/react'
import { createClienteSchema } from '../../../../validations/movimientos/clientes'
import useClientesStore from '../../../../hooks/useClientesStore'
import { CrearCliente } from '../../../../types'
import { cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useFormik } from 'formik'

const CreateClienteView = () => {
  
    const { handleCreateCliente , loading : loadingCreateCliente } = useClientesStore()
    
    const initialValues : CrearCliente = {
        fecha_nacimiento: new Date(),
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        empresa: '',
        rfc: '',
    }

    
    const {
        handleChange,
        handleSubmit,
        errors,
    } = useFormik<CrearCliente>({
        initialValues,
        onSubmit: ( values ) => handleCreateCliente(values),
        validationSchema: createClienteSchema
    })

    return (
    <div>
        <CCard>
            <CCardHeader>
                <strong>
                    Cliente Nuevo
                </strong>
            </CCardHeader>
            <CCardBody>
                {/* <pre>
                    {
                        JSON.stringify(errors, null , 3)
                    }
                </pre> */}
                <CForm onSubmit={handleSubmit}>
                    <CRow>
                        <CCol>
                            <CFormInput
                                feedbackInvalid={ errors.nombre ? `${errors.nombre}` : null }
                                className={`${errors.nombre ? "is-invalid" : ""}`}
                                placeholder="Nombre del cliente..."
                                disabled={loadingCreateCliente}
                                onChange={handleChange}
                                autoComplete={"none"}
                                label="Nombre"
                                name="nombre"
                                type="text"
                                // text="Must be 8-20 characters long."
                                // aria-describedby="exampleFormControlInputHelpInline"
                            />
                            {/* {
                                errors.nombre &&
                                <CAlert className='mt-2' color="danger">
                                    {
                                        errors.nombre 
                                    }
                                </CAlert>
                            } */}
                        </CCol>
                        <CCol>
                            <CFormInput
                                feedbackInvalid={ errors.apellido ? `${errors.apellido}` : null }
                                className={`${errors.apellido ? "is-invalid" : ""}`}
                                placeholder="Apellido del cliente..."
                                disabled={loadingCreateCliente}
                                onChange={handleChange}
                                autoComplete={"none"}
                                label="Apellido"
                                name="apellido"
                                type="text"
                                // text="Must be 8-20 characters long."
                                // aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CCol>
                    </CRow>
                    <CRow className='mt-3'>
                        <CCol>
                            <CFormInput
                                feedbackInvalid={ errors.email ? `${errors.email}` : null }
                                className={`${errors.email ? "is-invalid" : ""}`}
                                disabled={loadingCreateCliente}
                                placeholder="prueba@gmail.com"
                                label="Correo Electronico"
                                onChange={handleChange}
                                autoComplete={"none"}
                                type="email"
                                name="email"
                                // text="Must be 8-20 characters long."
                                // aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                placeholder="Numero telefonico..."
                                disabled={loadingCreateCliente}
                                onChange={handleChange}
                                autoComplete={"none"}
                                label="Telefono"
                                name="telefono"
                                type="text"
                                // text="Must be 8-20 characters long."
                                // aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CCol>
                        
                    </CRow>
                    
                    <CRow className='mt-3'>
                        <CCol>
                            <CFormInput
                                feedbackInvalid={ errors.empresa ? `${errors.empresa}` : null }
                                className={`${errors.empresa ? "is-invalid" : ""}`}
                                placeholder="Empresa perteneciente..."
                                disabled={loadingCreateCliente}
                                onChange={handleChange}
                                autoComplete={"none"}
                                label="Empresa"
                                name="empresa"
                                type="text"
                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                feedbackInvalid={ errors.rfc ? `${errors.rfc}` : null }
                                className={`${errors.rfc ? "is-invalid" : ""}`}
                                disabled={loadingCreateCliente}
                                onChange={handleChange}
                                placeholder="RFC..."
                                autoComplete="none"
                                label="RFC"
                                type="text"
                                name="rfc"
                            />
                        </CCol>
                    </CRow>

                    <hr />

                    <div className='mb- d-flex align-items-center justify-content-end'> 
                        <CButton disabled={loadingCreateCliente} type="submit" color="primary" shape="rounded-0">
                            {
                                !loadingCreateCliente
                                ?
                                <>
                                    <CIcon icon={cilSave} className="mr-1" />
                                    Guardar Cliente
                                </>
                                :
                                <>
                                    <CSpinner className='mr-1' size='sm' />
                                    Guardando...
                                </>
                            }
                        </CButton>
                    </div>
                
                </CForm>

            </CCardBody>
        </CCard>
    </div>
  )
}

export default CreateClienteView