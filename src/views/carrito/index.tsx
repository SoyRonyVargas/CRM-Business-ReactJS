import Concepto from "../../components/carrito/concepto";
import useCarrito from "../../hooks/useCarrito";
import { SearchCarrito } from "../../types";
import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { cilSave } from "@coreui/icons";
import { useFormik } from "formik";
import {
  CListGroupItem,
  CFormSelect,
  CListGroup,
  CFormInput,
  CCardBody,
  CButton,
  CForm,
  CCard,
  CCol,
  CRow
} from "@coreui/react";

const CarritoView = () => {
  const { values } = useFormik<SearchCarrito>({
    initialValues: {
      cliente: "",
    },
    onSubmit: () => {},
  });

  const { 
    loading, 
    conceptos, 
    clientes,
    handleObtenerCarrito, 
  } = useCarrito(values);

  useEffect(() => {
    handleObtenerCarrito();
  }, []);

  return (
    <CCard className="mb-3">
      {/* <pre>
        {
          JSON.stringify( conceptos , null , 3 )
        }
      </pre> */}
      <CCardBody>
        <h4>Carrito</h4>
        <hr />
        <CCard>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={5}>
                  <CFormInput
                    label="Nombre del cliente"
                    name="nombre"
                    type="text"
                  />
                </CCol>
                <CCol
                  xs={1}
                  className="d-flex justify-content-center align-items-end"
                >
                  <CButton
                    type="submit"
                    color="primary"
                    // shape="rounded-0"
                  >
                    Buscar
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CFormSelect
                    options={clientes}
                    label="Clientes"
                    name="cliente"
                    type="text"
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>

        <hr />

        <CRow>
          <CCol xs={8}>
            {loading == false &&
              conceptos &&
              conceptos?.map((c) => (
                <Concepto key={c.id} {...c} />
                // <pre>
                //   {
                //     JSON.stringify( c , null , 3)
                //   }
                // </pre>
              ))}
          </CCol>
          <CCol style={{ borderLeft: "1px solid #ddd" }} xs={4}>
            <CCard>
              <CCardBody>
                <CListGroup flush>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <>Precio por pieza</>
                    <strong>$40.00</strong>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <>Subtotal</>
                    <strong>$80.00</strong>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <strong>Total</strong>
                    <strong>$80.00</strong>
                  </CListGroupItem>
                </CListGroup>
                <hr className="mt-0" />
                <CButton className="w-100" color="primary" shape="rounded-1">
                  <CIcon className="mr-1" icon={cilSave} />
                  Guardar Orden
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default CarritoView;
