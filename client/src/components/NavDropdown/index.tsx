import React from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import {
  faListUl,
  faUser,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import NavDropdownFunction from '../NavDropdownFunction'
import NavDropdownLink from '../NavDropdownLink'
import { NavDropdownProps } from '../../types'
import './NavDropdown.scss'

const NavDropdown = ({
  display,
  setDropdownHidden,
  userId
}: NavDropdownProps) => {
  const history = useHistory()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const logout = () => {
    removeCookie('user')
    setDropdownHidden(true)
    history.push('/')
  }

  return (
    <div hidden={display} className='nav-dropdown'>
      <ul className='nav-dropdown__list'>
        <NavDropdownLink
          text='My events'
          icon={faListUl}
          destination={`/user/${userId}/my-events`}
        />
        <hr className='nav-dropdown__separator' />
        <NavDropdownLink
          text='My profile'
          icon={faUser}
          destination={`/user/${userId}`}
        />
        <hr className='nav-dropdown__separator' />
        <NavDropdownFunction
          text='Log out'
          icon={faSignOutAlt}
          handler={logout}
        />
      </ul>
    </div>
  )
}

export default NavDropdown
