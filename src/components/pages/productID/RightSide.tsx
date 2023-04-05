import { FichaContext } from "../../../views/productos/id";
import useUtils from "../../../hooks/useUtils";
import { ValuesFicha } from "../../../types";
import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";
import { useFormik } from "formik";
import { useContext } from 'react'
import {
    CBadge,
    CButton,
    CCol,
    CFormInput,
    CListGroup,
    CListGroupItem,
    CRow,
    CSpinner,
} from "@coreui/react";
import { parseCantidad } from "../../../utils/parseCantidad";


const RightSide = () => {

    
    const {
        producto,
        onSubmit,
        loading,
        concepto,
        handleChangeCantidad
    } = useContext(FichaContext)
    
    const formik = useFormik<ValuesFicha>({
        initialValues: {
            cantidad: 0,
        },
        onSubmit,
        // validationSchema: 
    })

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
                <strong style={{ color: "red" }}>{producto?.existencias}</strong>
            </h4>

            {/* <pre>
                {
                    JSON.stringify( formik.errors , null , 3 )
                }
            </pre> */}

            <form onSubmit={formik.handleSubmit}>

            <CRow className="mt-3">
                
                    <CCol xs={3}>
                        <CFormInput
                            // disabled={loading || producto?.existencias == 0}
                            className="rounded-0 outline-0"
                            onChange={(e) => {
                                formik.handleChange(e)
                                handleChangeCantidad(e)
                            }}
                            aria-label="lg input example"
                            placeholder="Cantidad..."
                            name="cantidad"
                            type="number"
                            size="lg"
                        />
                    </CCol>

                    <CCol xs={6}>
                        <CButton
                            style={{ width: "100%" }}
                            // disabled={loading || producto?.existencias == 0}
                            shape="rounded-0"
                            color="primary"
                            type="submit"
                            size="lg"
                        >
                            {
                                loading
                                ?
                                <CSpinner size="sm" />
                                :
                                <>
                                    <CIcon className="mr-1" size="lg" icon={cilCart} />
                                    Agregar Al Carrito
                                </>

                            }
                        </CButton>
                    </CCol>

                <hr className="mt-4" />

                <div>
                    <CListGroup flush>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <>Precio por pieza</>
                            <strong>{parseCantidad(producto?.precio)}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <>Importe</>
                            <strong>{concepto.importe}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <>IVA</>
                            <strong>{concepto.iva}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            <strong>Total</strong>
                            <strong>{concepto.total}</strong>
                        </CListGroupItem>
                    </CListGroup>
                </div>
            </CRow>
            </form>
        </div>
    );
};

export default RightSide;
