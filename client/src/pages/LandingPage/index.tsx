import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Modal from '../../components/Modal'
import GoogleUserLogin from '../../components/GoogleUserLogin'
import Button from '../../components/Button'
import { eventCategories } from '../../util/constants/eventCategories'
import './LandingPage.scss'

const LandingPage = () => {
  const [users, setUsers] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    userCount()
  }, [])

  const userCount = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/api/v1/users'
      })
      const data = response.data.length
      setUsers(data)
    } catch (error) {
      setUsers('Many')
    }
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
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className='landing-page__circle landing-page__circle--right'>
          <p className='landing-page__text landing-page__text--highlight'>
            {`${users} people already found event partners`}
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
