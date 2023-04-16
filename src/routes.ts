import CatalogoView from './views/catalogo'
import { lazy } from 'react'

// ORDENES DE VENTA

const DashboardView = lazy(() => import('./dashboard'))

// CLIENTES

const CreateClienteView = lazy( () => import('./views/movimientos/clientes/create'))
const MainClientesView = lazy(() => import('./views/movimientos/clientes'))
const EditClienteView = lazy(() => import('./views/movimientos/clientes/edit'))

// PRODUCTOS

const CreateProductosView = lazy(() => import('./views/movimientos/productos/create'))
const MainProductosView = lazy(() => import('./producto/listado'))
const ProductoIDView = lazy(() => import('./views/productos/id'))
const EditProductosView = lazy(() => import('./producto/editar'))

// ORDENES VENTA
const ListadoOrdenVentaView = lazy(() => import('./ventas/listado'))
const EditOrdenVentaView = lazy(() => import('./ventas/edit'))

// CARRITO
const CarritoView = lazy(() => import('./ventas/carrito'))

const routes = [
  { path: '/', name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: DashboardView },
  { path: '/carrito', name: 'Producto', element: CarritoView },
  { path: '/productos', name: 'Producto', element: CatalogoView },
  { path: '/producto/:id', name: 'Producto Por ID', element: ProductoIDView },
  { path: '/movimientos/clientes', name: 'Clientes', element: MainClientesView },
  { path: '/movimientos/clientes/nuevo', name: 'Nuevo', element: CreateClienteView },
  { path: '/movimientos/clientes/edit/:id', name: 'Editar', element: EditClienteView },
  { path: '/movimientos/productos', name: 'Productos', element: MainProductosView },
  { path: '/movimientos/productos/nuevo', name: 'Nuevo Producto', element: CreateProductosView },
  { path: '/movimientos/productos/edit/:id', name: 'Editar Producto', element: EditProductosView },
  { path: '/movimientos/ventas/edit/:id', name: 'Orden Venta', element: EditOrdenVentaView },
  { path: '/movimientos/ventas', name: 'Ordenes de venta', element: ListadoOrdenVentaView },
]

export default routes
