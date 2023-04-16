import avatar8 from './../../assets/user.png'
import { cilUser, cilAccountLogout } from '@coreui/icons'
import useAuthStore from '../../hooks/useAuthStore'
import CIcon from '@coreui/icons-react'
import React, { FC } from 'react'

import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'


const AppHeaderDropdown : FC<{}> = () => {
  
  const { handleCerrarSesion } = useAuthStore()

  return (
    <CDropdown variant="nav-item">
      
      <CDropdownToggle  className="py-0" caret={false}>
        
        <CAvatar src={avatar8} size="md" />

      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownHeader className="bg-light fw-semibold py-2">Configuración</CDropdownHeader>

        {/* <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Cuenta
        </CDropdownItem>

        <CDropdownDivider /> */}
        
        <CDropdownItem href="#" onClick={handleCerrarSesion}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Cerrar Sesión
        </CDropdownItem>
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
