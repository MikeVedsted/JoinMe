import React, { useEffect, useRef } from 'react'
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
  const node = useRef() as React.MutableRefObject<HTMLInputElement>
  const history = useHistory()
  const [, , removeCookie] = useCookies(['user'])

  const logout = () => {
    removeCookie('user')
    setDropdownHidden(true)
    history.push('/')
  }

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      return
    }
    setDropdownHidden(true)
  }

  useEffect(() => {
    if (display === false) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  return (
    <div ref={node} hidden={display} className='nav-dropdown'>
      <ul className='nav-dropdown__list'>
        <NavDropdownLink
          text='My events'
          icon={faListUl}
          destination={`/user/${userId}/hosted`}
          setDropdownHidden={setDropdownHidden}
        />
        <hr className='nav-dropdown__separator' />
        <NavDropdownLink
          text='My profile'
          icon={faUser}
          destination={`/user/${userId}`}
          setDropdownHidden={setDropdownHidden}
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
