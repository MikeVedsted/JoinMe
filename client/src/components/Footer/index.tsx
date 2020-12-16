import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import logo from '../../Assets/logo.svg'
import './Footer.scss'

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
        <p className='footer__paragraph'>&#169; copyright JoinMe 2020</p>
      </div>
      <div className='footer__container'>
        <p className='footer__paragraph'>
          Contact us:{' '}
          <a
            className='footer__link'
            href='mailto: contact.joinme2020@gmail.com'
          >
            contact.joinme2020@gmail.com
          </a>
        </p>
        <a
          className='footer__link'
          href='https://github.com/MikeVedsted/JoinMe'
          target='a_blank'
        >
          <FontAwesomeIcon className='footer__icon' icon={faGithub} />
        </a>
      </div>
    </div>
  )
}

export default Footer
