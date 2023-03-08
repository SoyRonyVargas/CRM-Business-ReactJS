import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CRow, CSpinner } from '@coreui/react'
import { OBTENER_CLIENTE } from '../../../../graphql/movimientos/clientes'
import { ActualizarCliente, Cliente, CrearCliente, WrapperQuery } from '../../../../types'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import { cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { createClienteSchema } from '../../../../validations/movimientos/clientes'
import useClientesStore from '../../../../hooks/useClientesStore'

const EditClienteView = () => {

  const { id } = useParams<"id">()
  
  const { edit: { handleActualizarCliente , loading } } = useClientesStore()
  
  const { data: cliente } = useQuery<WrapperQuery<Cliente>>(OBTENER_CLIENTE, {
    variables: {
      input: id 
    }
  })

  const loadingCreateCliente = loading

  const { 
      handleChange,
      handleSubmit,
      errors,
      values
  } = useFormik<Cliente>({
      enableReinitialize: true,
      initialValues: cliente?.obtenerCliente,
      onSubmit: ( values ) => handleActualizarCliente({
        ...values,
        vendedor: values.vendedor.id
      }),
      // validationSchema: createClienteSchema
  })

  return (
    <div>
      {/* <pre>
      {
        JSON.stringify( cliente , null , 3 )
      }
      </pre>
      <pre>
      {
        JSON.stringify( values , null , 3 )
      }
      </pre> */}
        <CCard>   
            <CCardHeader>
                <strong>
                    Actualizar Cliente
                </strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit}>
                    <CRow>
                        <CCol>
                            <CFormInput
                                feedbackInvalid={ errors?.nombre ? `${errors?.nombre}` : null }
                                className={`${errors?.nombre ? "is-invalid" : ""}`}
                                placeholder="Nombre del cliente..."
                                disabled={loadingCreateCliente}
                                onChange={handleChange}
                                defaultValue={values?.nombre}
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
                                feedbackInvalid={ errors?.apellido ? `${errors?.apellido}` : null }
                                className={`${errors?.apellido ? "is-invalid" : ""}`}
                                placeholder="Apellido del cliente..."
                                disabled={loadingCreateCliente}
                                value={values?.apellido}
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
                                value={values?.email}
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
                                value={values?.telefono}
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
                                value={values?.empresa}
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
                                value={values?.rfc}
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

export default EditClienteView
