import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { NavDropdownLinkProps } from '../../types'

const NavDropdownLink = ({ text, icon, destination }: NavDropdownLinkProps) => {
  return (
    <Link to={destination} className='nav-dropdown__link'>
      <li className='nav-dropdown__item'>
        <FontAwesomeIcon icon={icon} className='nav-dropdown__item--icon' />
        {text}
      </li>
    </Link>
  )
}

export default NavDropdownLink
