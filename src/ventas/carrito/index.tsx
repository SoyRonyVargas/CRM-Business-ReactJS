import FormBusqueda from "./components/FormBusqueda";
import LeftSide from "./components/LeftSide";
import useCarrito from "./hooks/useCarrito";
import Total from "./components/Total";
import {
  CCardBody,
  CCard,
  CRow
} from "@coreui/react";
import { CarritoContext } from "./context/CarritoContext";

const index = () => {

  const carrito = useCarrito()

  return (
    <CarritoContext.Provider value={carrito}>
        <CCard className="mb-3">
          {/* { carrito.conceptos.length } */}
        {/* <pre>
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
        </pre>  */}
        {/* <pre>
        {
            JSON.stringify( carrito.conceptos , null , 3 )
          }
        </pre> */}
        <CCardBody>
          <form onSubmit={carrito.handleGuardarOrdenVenta}>
            <h4>Carrito</h4>
            <hr />

            <FormBusqueda/>

            <hr />

            <CRow>
              <LeftSide/>
              <Total/>
            </CRow>

          </form>
        </CCardBody>
      </CCard>
    </CarritoContext.Provider>
  );
};

export default index;