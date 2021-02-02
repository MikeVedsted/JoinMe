import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavDropdownFunctionProps } from '../../Types'

const NavDropdownFunction = ({
  text,
  icon,
  handler
}: NavDropdownFunctionProps) => {
  return (
    <li className='nav-dropdown__item' onClick={handler}>
      <FontAwesomeIcon icon={icon} className='nav-dropdown__item--icon' />
      {text}
    </li>
  )
}

export default NavDropdownFunction
