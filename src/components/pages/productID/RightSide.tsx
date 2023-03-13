import { FichaContext } from "../../../views/productos/id";
import useUtils from "../../../hooks/useUtils";
import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";
import { useContext } from 'react'
import {
    CBadge,
    CButton,
    CCol,
    CFormInput,
    CListGroup,
    CListGroupItem,
    CRow,
} from "@coreui/react";

const RightSide = () => {

    const {
        producto,
        formik
    } = useContext(FichaContext)

    const { handleRenderPrecio } = useUtils();

    return (
        <div>
            <h3> {producto?.nombre} </h3>

            <hr />

            <div className="mb-2">
                <CBadge color="danger">En Stock</CBadge>
            </div>

            <p>{producto?.descripcion}</p>
            <h2>
                <strong>{handleRenderPrecio(producto?.precio)}</strong>
            </h2>

            <h4 style={{ fontStyle: "italic" }} className="mt-2">
                Existencias:{" "}
                <strong style={{ color: "red" }}>{producto?.existencias || 100}</strong>
            </h4>

            <CRow className="mt-3">
                
                <CCol xs={3}>
                    <CFormInput
                        aria-label="lg input example"
                        placeholder="Cantidad..."
                        className="rounded-0 outline-0"
                        type="number"
                        size="lg"
                        name="cantidad"
                        onChange={formik}
                    />
                </CCol>

                <CCol xs={6}>
                    <CButton
                        style={{ width: "100%" }}
                        size="lg"
                        color="primary"
                        shape="rounded-0"
                    >
                        <CIcon className="mr-1" size="lg" icon={cilCart} />
                        Agregar Al Carrito
                    </CButton>
                </CCol>

                <hr className="mt-4" />

                <div>
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
                </div>
            </CRow>
        </div>
    );
};

export default RightSide;
