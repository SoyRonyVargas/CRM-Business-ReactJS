import { Producto } from "../../../types"
import { FormikErrors } from "formik"

export type HEditProducto = {
    handleActualizarProducto? : ( product: Producto ) => Promise<void>;
    handleSubmit?: (e?: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void
    handleRemoveImagen?: ( imagen: string ) => void
    handleDrop?: ( files: any[] ) => void
    errors?: FormikErrors<Producto>
    getFieldProps?: any
    setFieldValue?: any
    values?: Producto
    loading: boolean
}