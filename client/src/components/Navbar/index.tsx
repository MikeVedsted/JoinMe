import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavDropdown from '../NavDropdown'
import ProfileImage from '../ProfileImage'
import GoogleLogin from '../GoogleUserLogin'
import logoDark from '../../Assets/logoDark.svg'
import logoLight from '../../Assets/logoSecondary.svg'
import { AppState } from '../../types'
import './Navbar.scss'

// TO DO
// Check auth in state and remove cookie check
// Handle dropdown from ui state

const Navbar = () => {
  const { profile_image, user_id } = useSelector(
    (state: AppState) => state.user.user
  )
  const { isDropDownOpen } = useSelector((state: AppState) => state.ui)
  const [navHasBackground, setNavHasBackground] = useState(false)

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

      {user_id ? (
        <div className='nav__options'>
          <FontAwesomeIcon className='nav__icon' icon='bell' />
          <FontAwesomeIcon className='nav__icon' icon='comment' />
          <ProfileImage
            image={profile_image}
            alt='You. Click here for menu.'
            onClick={() => setDropdownHidden(!dropdownHidden)}
          />
        </div>
      ) : (
        <div className='nav__login'>
          <GoogleLogin />
        </div>
      )}

      <NavDropdown
        display={isDropDownOpen}
        setDropdownHidden={setDropdownHidden}
        userId={user_id}
      />
    </nav>
  )
}

export default Navbar
