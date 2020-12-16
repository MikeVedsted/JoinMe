import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import logo from '../../Assets/logo.svg'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__container'>
        <img
          className='footer__image footer__image--logo'
          src={logo}
          alt='logo'
        />
      </div>
      <div className='footer__container'>
        <p>copyright joinme 2020</p>
      </div>
      <div className='footer__container'>
        <p>
          Contact us:{' '}
          <a href='mailto: contact.joinme2020@gmail.com'>
            contact.joinme2020@gmail.com
          </a>
        </p>
        <a href='https://github.com/MikeVedsted/JoinMe' target='a_blank'>
          <FontAwesomeIcon className='footer__icon' icon={faGithub} />
        </a>
      </div>
    </div>
  )
}

export default Footer
