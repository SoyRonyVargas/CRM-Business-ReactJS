import { ListadoProductoContext } from "./context/ListadoProductoContext";
import useProductoListado from "./hooks/useProductoListado";
import Fila from "./components/Fila";
import {cilPlus } from "@coreui/icons";
import Loader from "./components/Loader";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

const MainProductosView = () => {
  
  const productolistado = useProductoListado()

  return (
    <ListadoProductoContext.Provider value={productolistado}>
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
                <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                <CTableHeaderCell scope="col">Fecha Creado</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              { 
                !productolistado.loading
                ? 
                <>
                  {
                    productolistado.productos.map( producto => (
                      <Fila 
                        key={producto.id}
                        {...producto} 
                      />
                    ))
                  }
                </>
                : 
                <Loader/>
              }
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </ListadoProductoContext.Provider>
  );
};

export default MainProductosView;
