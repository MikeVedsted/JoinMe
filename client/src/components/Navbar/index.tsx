import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'
import logo from './logo2.png'

const Navbar = () => {
  const [nav, setNav] = useState(true)
  const [logged, setLogged] = useState(true)

  const changeBG = () => {
    if (window.scrollY >= 80) {
      setNav(false)
    } else {
      setNav(true)
    }
  }

  window.addEventListener('scroll', changeBG)

  return (
    <header className={nav ? 'header' : 'header header--active'}>
      <img
        className="header__image header__image--logo"
        src={logo}
        alt="logo"
      />
      {logged ? (
        <div className="header__icons">
          <FontAwesomeIcon className="header__icon" icon={faBell} />
          <FontAwesomeIcon className="header__icon" icon={faComment} />
          <img
            className="header__image header__image--profile"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="profile"
          />
        </div>
      ) : (
        <h2
          className={
            !logged ? 'header__login' : 'header__login header__login--hide'
          }
        >
          Login
        </h2>
      )}
    </header>
  )
}

export default Navbar
