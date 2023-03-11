import { OBTENER_PRODUCTOS } from "../../../graphql/productos";
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import { Producto, WrapperQuery } from "../../../types";
import useUtils from "../../../hooks/useUtils";
import { useQuery } from "@apollo/client";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import React from "react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CImage,
  CSpinner,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";


const MainProductosView = () => {

  const { data } = useQuery<WrapperQuery<Producto[]>>(OBTENER_PRODUCTOS)
  
  const { handleRenderDate , handleRenderPrecio } = useUtils()

  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>Productos</strong>
        </CCardHeader>
        <CCardBody>
          <div className="mb-3 d-flex align-items-center justify-content-end">
            <Link to={"/movimientos/productos/nuevo"}>
              <CButton color="primary" shape="rounded-0">
                <CIcon icon={cilPlus} className="mr-1" />
                Agregar Producto
              </CButton>
            </Link>
          </div>

          <CTable bordered striped className="datatable no-footer mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
                <CTableHeaderCell scope="col">Existencias</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col"> Creado </CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data?.obtenerProductos ? (
                data?.obtenerProductos.map(( producto ) => {
                  return (
                    <CTableRow id={producto.id}>
                      <CTableHeaderCell scope="col">
                        <CImage 
                          src={producto.imagen[0]} 
                          align="start" 
                          height={60} 
                          width={60}
                          rounded 
                        />
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {producto.nombre}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {handleRenderPrecio(producto.precio)}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        { producto.existencias }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <CBadge color="success">ACTIVO</CBadge>
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {handleRenderDate(producto.creado)}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        
                        <Link to={`/movimientos/productos/edit/${producto.id}`}>
                          <CButton
                            // disabled={loading_del}
                            color="warning"
                            className=""
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </Link>

                        <CButton
                          // disabled={loading_del}
                          // onClick={() => handleDeleteCliente(cliente)}
                          color="danger"
                          className="mx-1"
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>

                        {/* <CButton color="primary">
                            <CIcon icon={cilTrash} />
                          </CButton> */}
                      </CTableHeaderCell>
                    </CTableRow>
                  );
                })
              ) : (
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <CSpinner />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CSpinner />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CSpinner />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CSpinner />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CSpinner />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CSpinner />
                  </CTableHeaderCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default MainProductosView;
