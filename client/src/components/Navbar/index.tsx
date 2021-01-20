import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavDropdown from '../NavDropdown'
import ProfileImage from '../ProfileImage'
import GoogleLogin from '../GoogleUserLogin'
import logoDark from '../../Assets/logoDark.svg'
import logoLight from '../../Assets/logoSecondary.svg'
import './Navbar.scss'

// TO DO
// Check auth in state and remove cookie check
// Handle dropdown from ui state
// Get user_id and image from state

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

      {user_id ? (
        <div className='nav__options'>
          <FontAwesomeIcon className='nav__icon' icon='bell' />
          <FontAwesomeIcon className='nav__icon' icon='comment' />
          <ProfileImage
            image={profileImage}
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
        display={dropdownHidden}
        setDropdownHidden={setDropdownHidden}
        userId={user_id}
      />
    </nav>
  )
}

export default Navbar
