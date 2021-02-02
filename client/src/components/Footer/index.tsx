import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from '../../Assets/logoLight.svg'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <Link to='/'>
        <img className='footer__logo' src={logo} alt='logo' />
      </Link>

      <p className='footer__text'>&#169; copyright JoinMe 2020</p>

      <p className='footer__text'>
        <a
          className='footer__text--link'
          href='mailto: contact.joinme2020@gmail.com'
        >
          contact.joinme2020@gmail.com
        </a>
        <a
          className='footer__text--link'
          href='https://github.com/MikeVedsted/JoinMe'
          target='a_blank'
        >
          <FontAwesomeIcon className='footer__icon' icon={['fab', 'github']} />
        </a>
      </p>
    </div>
  )
}

export default Footer
