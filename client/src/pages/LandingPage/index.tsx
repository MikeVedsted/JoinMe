import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Modal from '../../components/Modal'
import Button from '../../components/Button'
import CircleContainer from '../../components/CircleContainer'
import ModalLogin from '../../components/ModalLogin'
import { eventCategories } from '../../util/constants/eventCategories'
import { AppState } from '../../Types'
import './LandingPage.scss'
import { closeModal } from '../../redux/actions'

const LandingPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [users, setUsers] = useState('')
  const { user_id } = useSelector((state: AppState) => state.user)
  const { hideModal } = useSelector((state: AppState) => state.ui)

  useEffect(() => {
    user_id && dispatch(closeModal())
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

  return (
    <div className='landing-page'>
      {!hideModal && <Modal content={<ModalLogin />} />}
      <div className='landing-page__circles'>
        <CircleContainer
          title={`${eventCategories.length} categories of events are waiting!`}
          text='..invite others to your event or join theirs, all over Finland!'
        />
        <CircleContainer
          title={`${users} people have already joined`}
          text='..join them in the search for great social sporting activities!'
        />
      </div>
      <div className='landing-page__button'>
        <Button
          type='button'
          text='Get started!'
          modifier='secondary'
          onClick={() => console.log('setIsModalOpen(!isModalOpen)')}
        />
      </div>
    </div>
  )
}

export default LandingPage
