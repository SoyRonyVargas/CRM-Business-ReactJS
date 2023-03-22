import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormSelect, CRow } from "@coreui/react"
import CardPlaceHolder from "../../components/card-catalogo/card-loader"
import useCatalogoProductos from "../../hooks/useCatalogoProductos"
import CardCatalogo from "../../components/card-catalogo"

const CatalogoView = () => {
  
 
  const { 
    handleChange,
    handleSubmit,
    productos,
    loading,
    values,
  } = useCatalogoProductos()
  
  return (
    <>
    <pre>
      {
        JSON.stringify( values , null , 3 )
      }
    </pre>
      <CCard className="mb-3">
        <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol xs={4}>
                  <CFormInput
                    onChange={handleChange}
                    label="Nombre Producto"
                    name="nombre"
                    type="text"
                />
                </CCol>
                <CCol xs={3}>
                  <CFormSelect
                    options={[
                      { label: 'Activo', value: '0' },
                      { label: 'Inactivo', value: '1' },
                      { label: 'Pendiente', value: '2' }
                    ]}
                    onChange={handleChange}
                    label="Estatus"
                    name="status"
                    type="text"
                />
                </CCol>
                <CCol xs={4}>
                  <CFormInput
                  type="number"
                  label="Precio"
                />
                </CCol>
                <CCol xs={1} className="d-flex justify-content-center align-items-end">
                  <CButton type="submit" color="primary" shape="rounded-0">Buscar</CButton>
                </CCol>
              </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
      <CCardBody>
      <CRow className="mb-3" xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }} xl={{ cols: 4 }}>
        {
          loading == false 
          ?
          <>
            {
              productos.map( producto => (
                <CCol key={producto.id}>
                  <CardCatalogo
                    {...producto}
                  />
                </CCol>
              ))
            }
          </>
          :
          <>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
            <CCol>
              <CardPlaceHolder/>
            </CCol>
          </>
        }
      </CRow>
      </CCardBody>
    </CCard>
    </>
  )
}

export default CatalogoView