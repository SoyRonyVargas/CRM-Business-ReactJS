import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { selectSideBarState, setSideBarState } from '../../redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import LOGO from '../../assets/images/png/logo.png'
import { AppSidebarNav } from '../sidebarnav'
import { LogoContainer } from '../../styled'
import { useSelector } from 'react-redux'
import 'simplebar/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'
import navigation from '../../_nav'
import React from 'react'

const AppSidebar = () => {
  
  const dispatch = useAppDispatch()
  const unfoldable = useAppSelector((state: any) => state.sidebarUnfoldable)
  const sidebarShow = useSelector(selectSideBarState)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSideBarState(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex">
        <LogoContainer>
          <CImage src={LOGO} />
        </LogoContainer>
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* 
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setSideBarState(!sidebarShow))}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
