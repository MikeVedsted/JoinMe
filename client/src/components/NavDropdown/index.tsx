import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  faListUl,
  faUser,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import NavDropdownLink from '../NavDropdownLink'
import NavDropdownFunction from '../NavDropdownFunction'
import { toggleNavDropdown, logout } from '../../redux/actions'
import { AppState } from '../../Types'
import './NavDropdown.scss'

const NavDropdown = () => {
  const dispatch = useDispatch()
  const node = useRef() as React.MutableRefObject<HTMLDivElement>
  const { user_id } = useSelector((state: AppState) => state.user.user)
  const { hideNavDropdown } = useSelector((state: AppState) => state.ui)

  const handleClickOutside = (e: any) => {
    !node.current.contains(e.target) &&
      dispatch(toggleNavDropdown(hideNavDropdown))
  }

  useEffect(() => {
    hideNavDropdown
      ? document.removeEventListener('click', handleClickOutside)
      : document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  return (
    <div ref={node} hidden={hideNavDropdown} className='nav-dropdown'>
      <ul className='nav-dropdown__list'>
        <NavDropdownLink
          text='My events'
          icon={faListUl}
          destination={`/user/${user_id}/hosted`}
        />
        <hr className='nav-dropdown__separator' />
        <NavDropdownLink
          text='My profile'
          icon={faUser}
          destination={`/user/${user_id}`}
        />
        <hr className='nav-dropdown__separator' />
        <NavDropdownFunction
          text='Log out'
          icon={faSignOutAlt}
          handler={() => dispatch(logout())}
        />
      </ul>
    </div>
  )
}

export default NavDropdown
