import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Modal from '../../components/Modal'
import GoogleUserLogin from '../../components/GoogleUserLogin'
import Button from '../../components/Button'
import { eventCategories } from '../../util/constants/eventCategories'
import './LandingPage.scss'

const LandingPage = () => {
  const [error, setError] = useState('')
  const [users, setUsers] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const history = useHistory()

  useEffect(() => {
    userCount()
  }, [])

  const handleClick = () => {
    history.push('/home')
  }

  const userCount = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/v1/users'
      })
      const data = response.data.length
      setUsers(data)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='body'>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          content={
            <>
              <h3>Log in!</h3>
              <p className='body__text body__text--login-text'>
                Hi! Login with Google to proceed!
              </p>
              <GoogleUserLogin />
            </>
          }
        />
      )}
      <div className='body__circles'>
        <div className='body__circle body__circle--left'>
          <p className='body__text body__text--highlight'>
            Table Tennis Basketball, Horse Riding
          </p>
          <p className='body__text'>
            {`..and ${eventCategories.length} other events are available in Helsinki which you can join!`}
          </p>
        </div>
        <div className='body__button'>
          <Button
            type='button'
            text='Get started!'
            modifier='secondary'
            handleClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className='body__circle body__circle--right'>
          <p className='body__text body__text--highlight'>
            {`${users} people already found event partners`}
          </p>
          <p className='body__text'>
            ..and hundreds more are waiting for you to create events and play
            together!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
