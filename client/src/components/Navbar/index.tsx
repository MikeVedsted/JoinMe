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
  const [navBg, setNavBg] = useState(true)
  const [dropdownHidden, setDropdownHidden] = useState(true)
  const [cookies, setCookies] = useCookies(['user'])
  const { profile_image } =
    cookies.user ||
    'https://res.cloudinary.com/dahevvjff/image/upload/v1608637375/ughqusxea2vuexzlwmqt.png'
  const { user_id } = cookies.user || ''

  const changeNavStyle = () => {
    window.scrollY >= 50 ? setNavBg(false) : setNavBg(true)
  }

  window.addEventListener('scroll', changeNavStyle)

  return (
    <nav className={navBg ? 'nav' : 'nav nav--active'}>
      <Link to='/home'>
        <img
          className='nav__image nav__image--logo'
          src={window.innerWidth > 1024 ? logoDark : logoLight}
          alt='logo'
        />
      </Link>
      {user_id ? (
        <div className='nav__icons'>
          <FontAwesomeIcon className='nav__icon' icon='bell' />
          <FontAwesomeIcon className='nav__icon' icon='comment' />
          <img
            onClick={() => setDropdownHidden(!dropdownHidden)}
            className='nav__image nav__image--profile'
            src={profile_image}
            alt='profile'
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
