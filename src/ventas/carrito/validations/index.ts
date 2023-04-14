import * as Yup from 'yup'

export const createOrdenVentaSchema = Yup.object({
    titulo_venta: Yup.string().min(2, "El nombre es demasiado corto").required("Campo obligatorio"),
    seleccion: Yup.string().min(1, "El cliente es requerido").required("Campo obligatorio"),
})