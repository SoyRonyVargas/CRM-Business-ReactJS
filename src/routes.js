import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const OrdenevesVentaView = React.lazy(() => import('./views/movimientos/ordenes_venta'))

// const Tables = React.lazy(() => import('./views/base/tables/Tables'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/movimientos/ordenes_venta', name: 'Orden Venta', element: OrdenevesVentaView },
]

export default routes
