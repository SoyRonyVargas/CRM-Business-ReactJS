import { cilLockLocked, cilUser } from '@coreui/icons'
import useAuthStore from '../hooks/useAuthStore'
import LogoImg from '../assets/images/logo.png'
import CIcon from '@coreui/icons-react'
import { string, object } from 'yup'
import { AuthUser } from '../types'
import { useFormik } from 'formik'
import React from 'react'
import {
  CRow,
  CInputGroupText,
  CInputGroup,
  CImage,
  CFormInput,
  CForm,
  CContainer,
  CCol,
  CSpinner,
  CCardGroup,
  CCardBody,
  CCard,
  CButton,
} from '@coreui/react'


const Logo = () => (
  <div className='container__logo'>
    <CImage
      src={LogoImg}
      fluid
      alt="Logo"
    />
  </div>
)
const Formulario = () => {
  
  const { handleLogin , auth_login } = useAuthStore()

  const login = async (values) => {
    await handleLogin(values)
  }
  
  const {
    handleSubmit,
    handleChange,
    errors
  } = useFormik<AuthUser>({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: object<AuthUser>({
      email: string().required("Ingresa el correo electronico"),
      password: string().required("Ingresa la contraseña")
    }),
    onSubmit: login
  })

  return (
    <CForm onSubmit={handleSubmit}>

      <CInputGroup className="mb-3">

        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>

        <CFormInput
          placeholder="Correo electronico"
          disabled={auth_login.loading}
          onChange={handleChange}
          autoComplete="off"
          name="email"
          size='lg'
        />

        {
          errors.email &&
          <div className="alert alert-danger w-100 mt-3 mb-0" role="alert">
            {errors.email}
          </div>
        }

      </CInputGroup>

      <CInputGroup className={`mb-${errors.password ? "0" : "3"}`}>

        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>

        <CFormInput
          autoComplete="current-password"
          disabled={auth_login.loading}
          placeholder="Contraseña"
          onChange={handleChange}
          type="password"
          name="password"
          size='lg'
        />

        {
          errors.password &&
          <div className="alert alert-danger w-100 mt-3" role="alert">
            {errors.password}
          </div>
        }

      </CInputGroup>

      <>
        <div className='d-grid gap-2 ' >
          
            <CButton
              className='btn btn-primary d-block mb-2'
              disabled={auth_login.loading}
              color="primary"
              type='submit'
              size='lg'
            >

              {
                auth_login.loading
                ?
                <CSpinner color="light"/>
                : 
                <>
                  Iniciar Sesión
                </>
              }
              
            </CButton>
          
          {
          auth_login.error &&
            <div className="alert alert-danger w-100" role="alert">
              {auth_login.error}
            </div>
          }

        </div>
        <CCol xs={6} className="text-right">
          <CButton color="link" className="px-0">
            ¿Olvidaste tu contraseña?
          </CButton>
        </CCol>
      </>
    </CForm>
  )

}

const Login = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody style={{ paddingTop: 0 }}>
                  <Logo />
                  <p className="text-medium-emphasis text-center">Inicia sesión en tu cuenta</p>
                  <Formulario />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
