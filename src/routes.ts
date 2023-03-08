import { lazy } from 'react'

// ORDENES DE VENTA

const OrdenesVentaView = lazy(() => import('./views/movimientos/ordenes_venta'))

// CLIENTES

const CreateClienteView = lazy( () => import('./views/movimientos/clientes/create'))
const MainClientesView = lazy(() => import('./views/movimientos/clientes'))
const EditClienteView = lazy(() => import('./views/movimientos/clientes'))

// PRODUCTOS

const CreateProductosView = lazy(() => import('./views/movimientos/productos/create'))
const MainProductosView = lazy(() => import('./views/movimientos/productos'))

const routes = [
  { path: '/', name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: OrdenesVentaView },
  { path: '/movimientos/ordenes_venta', name: 'Orden Venta', element: OrdenesVentaView },
  { path: '/movimientos/clientes', name: 'Clientes', element: MainClientesView },
  { path: '/movimientos/clientes/nuevo', name: 'Nuevo', element: CreateClienteView },
  { path: '/movimientos/clientes/edit/:id', name: 'Editar', element: EditClienteView },
  { path: '/movimientos/productos', name: 'Productos', element: MainProductosView },
  { path: '/movimientos/productos/nuevo', name: 'Nuevo Producto', element: CreateProductosView },
]

export default routes
