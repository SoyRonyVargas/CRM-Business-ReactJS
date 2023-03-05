import * as Yup from 'yup'

export const createClienteSchema = Yup.object({
    nombre: Yup.string().min(2, "El nombre es demasiado corto").required("Campo obligatorio"),
    apellido: Yup.string().min(2, "El apellido es demasiado corto").required("Campo obligatorio"),
    email: Yup.string().min(2, "El apellido es demasiado corto").email("Ingresa un correo electronico valido").required("Campo obligatorio"),
    telefono: Yup.string(),
    empresa: Yup.string().min(1, "Ingresa un empresa valida").required("Campo obligatorio"),
    rfc: Yup.string().required("Campo obligatorio"),
})