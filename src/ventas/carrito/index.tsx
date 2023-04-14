import LoaderConceptoCarrito from "../../components/carrito/concepto/Loader";
import Concepto from "../../components/carrito/concepto";
import useCarrito from "./hooks/useCarrito";
import CIcon from "@coreui/icons-react";
import { cilSave } from "@coreui/icons";
import {
  CListGroupItem,
  CListGroup,
  CFormInput,
  CCardBody,
  CButton,
  CCard,
  CCol,
  CRow
} from "@coreui/react";

const index = () => {

  const {
    orden,
    values,
    errors,
    enviado,
    loading,
    clientes,
    buscador,
    conceptos,
    handleChange,
    getFieldProps,
    handleGuardarOrdenVenta
  } = useCarrito();

  return (
    <CCard className="mb-3">
      <pre>
        {
          JSON.stringify( values , null , 3 )
        }
      </pre>
      <pre>
        {
          JSON.stringify( clientes , null , 3 )
        }
      </pre>
      errores
      <pre>
        {
          JSON.stringify( errors , null , 3 )
        }
      </pre>
       <pre>
        {
          JSON.stringify( enviado , null , 3 )
        }
      </pre> 
       <pre>
        {
          JSON.stringify( errors , null , 3 )
        }
      </pre> 
      <CCardBody>
        <form onSubmit={handleGuardarOrdenVenta}>
          <h4>Carrito</h4>
          <hr />
          <CCard>
            <CCardBody>

              <CRow>
                <CCol xs={5}>
                  <CFormInput
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
                    className={`form-select ${errors.seleccion ? 'is-invalid': ''}`}
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

          <hr />

          <CRow>
            <CCol xs={8}>
              {
                (loading == false && conceptos) ?
                  <>
                  {
                    conceptos?.map((c) => (
                    <Concepto key={c.id} {...c} />
                      ))
                    }
                  </>
                :
                <>
                  {
                    [ 1,2 ].map( e => (
                      <LoaderConceptoCarrito/>
                    ))
                  }
                </>
              }
            </CCol>
            <CCol style={{ borderLeft: "1px solid #ddd" }} xs={4}>
              <CCard>
                <CCardBody>
                  <CListGroup flush>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>Subtotal</strong>
                      <strong>{orden.importe}</strong>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>IVA</strong>
                      <strong>{orden.iva}</strong>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>Total</strong>
                      <strong>{orden.total}</strong>
                    </CListGroupItem>
                  </CListGroup>
                  <hr className="mt-0" />
                  <CButton type="submit" className="w-100" color="primary" shape="rounded-1">
                    <CIcon className="mr-1" icon={cilSave} />
                    Guardar Orden
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default index;