import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavDropdown from '../NavDropdown'
import GoogleLogin from '../GoogleLogin'
import ProfileImage from '../ProfileImage'
import logoDark from '../../Assets/logoDark.svg'
import logoLight from '../../Assets/logoSecondary.svg'
import { screenGreaterThan } from '../../util/helperFunctions'
import { toggleNavDropdown } from '../../redux/actions'
import { AppState } from '../../Types'
import './Navbar.scss'

const Navbar = () => {
  const dispatch = useDispatch()
  const { profile_image } = useSelector((state: AppState) => state.user)
  const { hideNavDropdown } = useSelector((state: AppState) => state.ui)
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)
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
          src={screenGreaterThan(1024) ? logoDark : logoLight}
          alt='logo'
        />
      </Link>

      {isAuthenticated ? (
        <div className='nav__options'>
          <FontAwesomeIcon className='nav__icon' icon='bell' />
          <FontAwesomeIcon className='nav__icon' icon='comment' />
          <ProfileImage
            image={profile_image}
            alt='You. Click here for menu.'
            onClick={() => dispatch(toggleNavDropdown(hideNavDropdown))}
          />
        </div>
      ) : (
        <div className='nav__login'>
          <GoogleLogin />
        </div>
      )}
      <NavDropdown />
    </nav>
  )
}

export default Navbar
