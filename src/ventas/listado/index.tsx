import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {
    CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import useVentas from "./hooks/useVentas";
import { cilPencil } from "@coreui/icons";
import { parseCantidad } from "../../utils/parseCantidad";
import useUtils from "../../hooks/useUtils";

const index = () => {
  
    const { 
        loading,
        ordenes
    } = useVentas()

    const { handleRenderDate } = useUtils()

    return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>Ordenes de venta</strong>
        </CCardHeader>
        <CCardBody>
          <CTable bordered striped className="datatable no-footer mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Titulo</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total productos</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Importe</CTableHeaderCell>
                <CTableHeaderCell scope="col">IVA</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                <CTableHeaderCell scope="col">Fecha creación</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              { !loading ? (
                ordenes.map(( orden ) => {
                  return (
                    <CTableRow id={orden.id}>
                      <CTableHeaderCell scope="col">
                        {orden.titulo_venta}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                         { orden.total_productos }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        {orden.cliente?.nombre}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                      {
                          orden.status == 0 &&
                          <CBadge color="success ml-1">ACTIVO</CBadge>
                      }
                      {
                          orden.status == 1 &&
                          <CBadge color="info">Terminado</CBadge>
                      }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        { parseCantidad(orden.importe) }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        { parseCantidad(orden.iva) }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        { parseCantidad(orden.total) }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        { handleRenderDate(orden.creado) }
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <Link to={`/movimientos/ventas/edit/${orden.id}`}>
                          <CButton
                            disabled={loading}
                            color="warning"
                            className=""
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </Link>
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

export default index;
