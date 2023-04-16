import { cilPencil, cilTrash } from "@coreui/icons";
import useUtils from "../../../hooks/useUtils";
import { Producto } from "../../../types";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { FC, useContext } from "react";
import {
    CTableHeaderCell,
    CTableRow,
    CButton,
    CBadge,
    CImage,
} from "@coreui/react";
import { ListadoProductoContext } from "../context/ListadoProductoContext";
  
const Fila: FC<Producto> = ( props ) => {

    const producto = props

    const { handleRenderDate , handleRenderPrecio } = useUtils()

    const {
        handleRemoveConcepto
    } = useContext(ListadoProductoContext)
    
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
                {producto.existencias}
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
                        color="warning"
                        className=""
                    >
                        <CIcon icon={cilPencil} />
                    </CButton>
                </Link>

                <CButton
                    onClick={() => handleRemoveConcepto(producto.id)}
                    color="danger"
                    className="mx-1"
                >
                    <CIcon icon={cilTrash} />
                </CButton>
            </CTableHeaderCell>
        </CTableRow>
    )
}

export default Fila