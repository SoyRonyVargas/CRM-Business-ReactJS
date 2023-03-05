import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { NavElement } from './types'
import React from 'react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilContact,
  cilPencil,
  cilPuzzle,
  cilStar,
  cilTransfer,
} from '@coreui/icons'

const _nav: NavElement[] = [
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  {
    component: CNavGroup,
    name: "Productos",
    to: "/productos"
  },
  {
    component: CNavGroup,
    name: 'Movimientos',
    to: '/base',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Entradas',
        to: '/movimientos/entradas',
      },
      {
        component: CNavItem,
        name: 'Ventas',
        to: '/movimientos/ventas',
      },
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/movimientos/clientes',
        // icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
