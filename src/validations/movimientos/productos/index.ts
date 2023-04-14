import * as Yup from 'yup'
import { DEFAULT_SCHEMA_REQUIRED } from '../../../default'

export const createProductoSchema = Yup.object({
    nombre: Yup.string().min(2, "El nombre es demasiado corto").required(DEFAULT_SCHEMA_REQUIRED),
    descripcion: Yup.string().min(2, "La descripción es requerida").required(DEFAULT_SCHEMA_REQUIRED),
    imagen: Yup.array().min(1 , "Ingresa al menos una imagen").required(DEFAULT_SCHEMA_REQUIRED),
    precio: Yup.number().required(DEFAULT_SCHEMA_REQUIRED),
    status: Yup.number().required(DEFAULT_SCHEMA_REQUIRED),
})

export const actualizarProductoSchema = Yup.object({
    nombre: Yup.string().min(2, "El nombre es demasiado corto").required(DEFAULT_SCHEMA_REQUIRED),
    descripcion: Yup.string().min(2, "La descripción es requerida").required(DEFAULT_SCHEMA_REQUIRED),
    // imagen: Yup.array().min(1 , "Ingresa al menos una imagen").required(DEFAULT_SCHEMA_REQUIRED),
    precio: Yup.number().required(DEFAULT_SCHEMA_REQUIRED),
    status: Yup.number().required(DEFAULT_SCHEMA_REQUIRED),
})