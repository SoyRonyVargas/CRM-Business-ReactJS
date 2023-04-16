import useCarrito from '../hooks/useCarrito';
import { createContext } from 'react'

type HCarrito = ReturnType<typeof useCarrito>;

export const CarritoContext = createContext<HCarrito | null>(null)