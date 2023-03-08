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
  cilArrowCircleRight,
  cilMoney,
  cilPeople,
  cilDollar,
  cilShortText,
  cilScreenDesktop,
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
        icon: <CIcon icon={cilArrowCircleRight} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Productos',
        to: '/movimientos/productos',
        icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Ventas',
        to: '/movimientos/ventas',
        icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/movimientos/clientes',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
