import useEditOrden from '../hooks/useEditOrden';
import { createContext } from 'react'

type HOrdenEdit = ReturnType<typeof useEditOrden>;

export const OrdenVentaEditContext = createContext<HOrdenEdit | null>(null)