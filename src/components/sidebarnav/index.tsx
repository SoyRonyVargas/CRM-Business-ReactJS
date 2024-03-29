import { NavLink, useLocation } from 'react-router-dom'
import { CBadge } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { NavElement } from '../../types'

type Props = {
  items: NavElement[]
}

export const AppSidebarNav = ({ items }: Props) => {
  
  const location = useLocation()
  
  const navLink = (name: string, icon: any, badge?: any , className: string = "") => {
    return (
      <>
        
        {icon && icon}
        
        {name && name}
        
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}

      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, primary , ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
        className={`${!primary ? 'nav-link-custom' : ''}`}
      >
        {
          navLink(name, icon, badge )
        }
      </Component>
    )
  }
  const navGroup = (item: NavElement, index: any) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
