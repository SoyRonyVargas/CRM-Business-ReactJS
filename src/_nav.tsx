import { CNavItem , CNavTitle} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { NavElement } from './types'
import React from 'react'
import {
  cilPeople,
  cilShortText,
  cilScreenDesktop,
  cilCart,
  cilBook,
} from '@coreui/icons'

const _nav: NavElement[] = [
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    primary: true,
    component: CNavTitle,
    name: 'Articulos',
  },
  // {
  //   component: CNavGroup,
  //   name: "Productos",
  //   to: "/productos",
  //   icon: <CIcon icon={cilTv} customClassName="nav-icon" />,
  //   items: [
      
  //   ]
  // },
  
  {
    primary: true,
    component: CNavItem,
    name: 'Catalogo',
    to: '/productos',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    primary: true,
    component: CNavItem,
    name: 'Carrito',
    to: '/carrito',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    primary: true,
    component: CNavItem,
    name: 'Ventas',
    to: '/movimientos/ventas',
    icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
  },
  {
    primary: true,
    component: CNavItem,
    name: 'Productos',
    to: '/movimientos/productos',
    icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
  },
  {
    primary: true,
    component: CNavItem,
    name: 'Clientes',
    to: '/movimientos/clientes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  // {
  //   primary: true,
  //   component: CNavGroup,
  //   name: 'Movimientos',
  //   to: '/base',
  //   icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Productos',
  //       to: '/movimientos/productos',
  //       icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Ventas',
  //       to: '/movimientos/ventas',
  //       icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Clientes',
  //       to: '/movimientos/clientes',
  //       icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
]

export default _nav
