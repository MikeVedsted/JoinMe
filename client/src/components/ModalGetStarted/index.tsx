import React from 'react'

import GoogleLogin from '../GoogleLogin'
import './ModalGetStarted.scss'

const ModalGetStarted = () => {
  return (
    <div className='login-modal'>
      <h2 className='login-modal__title'>Get started</h2>
      <p className='login-modal__text'>We are excited you want to join us!</p>
      <p className='login-modal__text'>
        Please log in with a Google account below. If you do not yet have an
        account with us, we will create one for you.
      </p>
      <GoogleLogin />
    </div>
  )
}

export default ModalGetStarted
