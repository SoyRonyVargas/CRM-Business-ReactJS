import React from 'react'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const OrdenesVentaView = React.lazy(() => import('./views/movimientos/ordenes_venta'))
const MainClientesView = React.lazy(() => import('./views/movimientos/clientes'))

// const Tables = React.lazy(() => import('./views/base/tables/Tables'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: OrdenesVentaView },
  { path: '/movimientos/ordenes_venta', name: 'Orden Venta', element: OrdenesVentaView },
  { path: '/movimientos/clientes', name: 'Clientes', element: MainClientesView },
]

export default routes
