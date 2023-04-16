import useProductoListado from '../hooks/useProductoListado'
import { createContext } from 'react'

type HListadoProducto = ReturnType<typeof useProductoListado>

export const ListadoProductoContext = createContext<HListadoProducto>(null)
