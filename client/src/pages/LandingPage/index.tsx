import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Modal from '../../components/Modal'
import Button from '../../components/Button'
import GoogleLogin from '../../components/GoogleLogin'
import { eventCategories } from '../../util/constants/eventCategories'
import './LandingPage.scss'

// TO DO
// Move userCount to dispatch
// Move auth check to state instead of cookie
// use clickOutside logic for modal

const LandingPage = () => {
  const history = useHistory()
  const [users, setUsers] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user || ''

  useEffect(() => {
    user_id && setIsModalOpen(false)
    user_id && history.push('/')
    getUserCount()
  }, [history, user_id])

  const getUserCount = async () => {
    try {
      const { data } = await axios.get('/api/v1/users/count')
      const count = data
      setUsers(count)
    } catch {
      setUsers('Many')
    }
  }

  const modalContent = () => {
    return (
      <div className='modal-content'>
        <h2 className='modal-content__title'>Get started</h2>
        <p className='modal-content__text'>
          We are excited you want to join us!
        </p>
        <p className='modal-content__text'>
          You can log in with a Google account below and if you do not yet have
          an account with us, we will create one for you.
        </p>
        <GoogleLogin />
      </div>
    )
  }

  return (
    <div className='landing-page'>
      {isModalOpen && <Modal content={modalContent()} />}
      <div className='landing-page__circles'>
        <div className='landing-page__circle'>
          <p className='landing-page__title'>
            {`${eventCategories.length} categories of events are waiting!`}
          </p>
          <p className='landing-page__text'>
            ..invite others to your event or join theirs, all over Finland!
          </p>
        </div>

        <div className='landing-page__circle'>
          <p className='landing-page__title'>
            {users} people have already joined
          </p>
          <p className='landing-page__text'>
            ..join them in the search for great social sporting activities!
          </p>
        </div>
      </div>
      <div className='landing-page__button'>
        <Button
          type='button'
          text='Get started!'
          modifier='secondary'
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
    </div>
  )
}

export default LandingPage
