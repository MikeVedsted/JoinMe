import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import NavDropdown from '../NavDropdown'
import GoogleLogin from '../GoogleUserLogin'
import logoDark from '../../Assets/logoDark.svg'
import logoLight from '../../Assets/logoSecondary.svg'
import './Navbar.scss'

const Navbar = () => {
  const [navHasBackground, setNavHasBackground] = useState(false)
  const [dropdownHidden, setDropdownHidden] = useState(true)
  const [cookies] = useCookies(['user'])
  const profileImage = cookies.user?.profile_image
  const { user_id } = cookies.user || ''

  const changeNavStyle = () => {
    window.scrollY >= 50
      ? setNavHasBackground(true)
      : setNavHasBackground(false)
  }

  window.addEventListener('scroll', changeNavStyle)

  return (
    <nav className={navHasBackground ? 'nav nav__overlay' : 'nav'}>
      <Link to='/'>
        <img
          className='nav__logo'
          src={window.innerWidth > 1024 ? logoDark : logoLight}
          alt='logo'
        />
      </Link>
      <div className='nav__options'>
        {user_id ? (
          <>
            <FontAwesomeIcon className='nav__icon' icon='bell' />
            <FontAwesomeIcon className='nav__icon' icon='comment' />
            <img
              onClick={() => setDropdownHidden(!dropdownHidden)}
              className='nav__profile-image'
              src={profileImage}
              alt='profile'
            />
          </>
        ) : (
          <GoogleLogin />
        )}
      </div>
      <NavDropdown
        display={dropdownHidden}
        setDropdownHidden={setDropdownHidden}
        userId={user_id}
      />
    </nav>
  )
}

export default Navbar
