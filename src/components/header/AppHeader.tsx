import { selectSideBarState, setSideBarState } from '../../redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { AppHeaderDropdown } from './index'
import { NavLink } from 'react-router-dom'
import { AppBreadcrumb } from '../index'
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import Carrito from './Carrito'

const AppHeader : React.FC = () => {
  
  const dispatch = useAppDispatch()
  
  const sidebarShow = useAppSelector(selectSideBarState)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setSideBarState(!sidebarShow))}
        >
        
          <CIcon icon={cilMenu} size="lg" />
        
        </CHeaderToggler>
        
        <CHeaderNav className="d-none d-md-flex me-auto">
          {/* <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        
        <CHeaderNav className="ms-3">
          
          <Carrito  />

          <AppHeaderDropdown />

        </CHeaderNav>

      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
