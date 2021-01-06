import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Modal from '../../components/Modal'
import GoogleUserLogin from '../../components/GoogleUserLogin'
import Button from '../../components/Button'
import { eventCategories } from '../../util/constants/eventCategories'
import './LandingPage.scss'

const LandingPage = () => {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user || ''

  useEffect(() => {
    user_id && history.push('/')
  }, [history, user_id])

  const handleGetStartedButton = () => {
    user_id ? history.push('/') : setIsModalOpen(true)
  }

  return (
    <div className='landing-page'>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          content={
            <>
              <h3>Log in!</h3>
              <p className='landing-page__text landing-page__text--login-text'>
                Hi! Login with Google to proceed!
              </p>
              <GoogleUserLogin />
            </>
          }
        />
      )}
      <div className='landing-page__circles'>
        <div className='landing-page__circle landing-page__circle--left'>
          <p className='landing-page__text landing-page__text--highlight'>
            Table Tennis Basketball, Horse Riding
          </p>
          <p className='landing-page__text'>
            {`..and ${eventCategories.length} other events are available in Helsinki which you can join!`}
          </p>
        </div>
        <div className='landing-page__button'>
          <Button
            type='button'
            text='Get started!'
            modifier='secondary'
            onClick={() => handleGetStartedButton()}
          />
        </div>
        <div className='landing-page__circle landing-page__circle--right'>
          <p className='landing-page__text landing-page__text--highlight'>
            Many people already found event partners
          </p>
          <p className='landing-page__text'>
            ..and hundreds more are waiting for you to create events and play
            together!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
