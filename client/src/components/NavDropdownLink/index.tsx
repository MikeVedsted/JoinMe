import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toggleNavDropdown } from '../../redux/actions'
import { NavDropdownLinkProps, AppState } from '../../Types'

const NavDropdownLink = ({ text, icon, destination }: NavDropdownLinkProps) => {
  const dispatch = useDispatch()
  const { hideNavDropdown } = useSelector((state: AppState) => state.ui)

  return (
    <Link
      to={destination}
      className='nav-dropdown__link'
      onClick={() => dispatch(toggleNavDropdown(hideNavDropdown))}
    >
      <li className='nav-dropdown__item'>
        <FontAwesomeIcon icon={icon} className='nav-dropdown__item--icon' />
        {text}
      </li>
    </Link>
  )
}

export default NavDropdownLink
