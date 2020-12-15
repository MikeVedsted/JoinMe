import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Button from '../../components/Button'
import { eventCategories } from '../../util/constants/eventCategories'
import './LandingPage.scss'

const LandingPage = () => {
  const [error, setError] = useState('')
  const [users, setUsers] = useState('')
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
            style='secondary'
            handleClick={handleClick}
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
