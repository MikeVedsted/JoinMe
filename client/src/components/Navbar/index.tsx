import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import GoogleLogin from '../GoogleUserLogin'
import logoDark from '../../Assets/logoDark.svg'
import logoLight from '../../Assets/logoSecondary.svg'
import './Navbar.scss'

const Navbar = () => {
  const [navBg, setNavBg] = useState(true)
  const [cookies, setCookies] = useCookies(['user'])
  const { profile_image, user_id } = cookies.user || ''

  const changeNavStyle = () => {
    window.scrollY >= 50 ? setNavBg(false) : setNavBg(true)
  }

  window.addEventListener('scroll', changeNavStyle)

  return (
    <nav className={navBg ? 'nav' : 'nav nav--active'}>
      <img
        className='nav__image nav__image--logo'
        src={window.innerWidth > 1024 ? logoDark : logoLight}
        alt='logo'
      />
      {user_id ? (
        <div className='nav__icons'>
          <FontAwesomeIcon className='nav__icon' icon='bell' />
          <FontAwesomeIcon className='nav__icon' icon='comment' />
          <Link to={`/${user_id}`}>
            <img
              className='nav__image nav__image--profile'
              src={profile_image}
              alt='profile'
            />
          </Link>
        </div>
      ) : (
        <div className='nav__login'>
          <GoogleLogin />
        </div>
      )}
    </nav>
  )
}

export default Navbar
