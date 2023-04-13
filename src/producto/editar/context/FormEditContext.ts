import { createContext } from 'react'
import { HEditProducto } from '../types'

export const FormEditContext = createContext<HEditProducto>({
    // getFieldProps: () => {},
    loading: false,
    values: null,
})