import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment } from '@fortawesome/free-solid-svg-icons'

import logo from '../../Assets/logo.svg'
import './Navbar.scss'

const Navbar = () => {
  const [navBg, setNavBg] = useState(true)
  const [cookies, setCookies] = useCookies(['user'])
  const { profile_image, user_id } = cookies.user || ''

  const changeNavStyle = () => {
    window.scrollY >= 80 ? setNavBg(false) : setNavBg(true)
  }

  window.addEventListener('scroll', changeNavStyle)

  return (
    <nav className={navBg ? 'nav' : 'nav nav--active'}>
      <img className='nav__image nav__image--logo' src={logo} alt='logo' />
      {user_id ? (
        <div className='nav__icons'>
          <FontAwesomeIcon className='nav__icon' icon={faBell} />
          <FontAwesomeIcon className='nav__icon' icon={faComment} />
          <Link to={`/${user_id}`}>
            <img
              className='nav__image nav__image--profile'
              src={profile_image}
              alt='profile'
            />
          </Link>
        </div>
      ) : (
        <h2 className={!user_id ? 'nav__login' : 'nav__login nav__login--hide'}>
          Login
        </h2>
      )}
    </nav>
  )
}

export default Navbar
