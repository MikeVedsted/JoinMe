import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventJoinRequestProps } from '../../types'
import './EventJoinRequest.scss'

const EventJoinRequest = ({ requester }: EventJoinRequestProps) => {
  const { profile_image, user_id, first_name, last_name, er_id } = requester

  const handleReject = async () => {
    try {
      await axios.delete(`/api/v1/requests/${er_id}/reject`)
      alert('Rejected')
    } catch (error) {
      alert('Something went wrong. Please refresh and try again.')
      console.log(error)
    }
  }

  const handleApprove = async () => {
    try {
      await axios.post(`/api/v1/requests/${er_id}/accept`)
      alert('Accepted')
    } catch (error) {
      alert('Something went wrong. Please refresh and try again.')
      console.log(error)
    }
  }

  return (
    <div className='participant'>
      <div className='participant__user-info'>
        <img
          className='participant__image'
          src={profile_image}
          alt={first_name}
        />
        <Link className='participant__link' to={`/user/${user_id}`}>
          <p className='participant__name'>{`${first_name} ${last_name}`}</p>
        </Link>
      </div>
      <FontAwesomeIcon
        onClick={handleApprove}
        className='participant__approve'
        icon={'user-check'}
      />
      <FontAwesomeIcon
        onClick={handleReject}
        className='participant__delete'
        icon={'trash'}
      />
    </div>
  )
}

export default EventJoinRequest
