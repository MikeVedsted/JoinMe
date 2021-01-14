import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import EventCommentSection from '../EventCommentSection'
import EventManageDropDown from '../../components/EventManageDropDown'
import { EventProps } from '../../types'
import './Event.scss'

const Event = ({ event, creatorName, participants }: EventProps) => {
  const history = useHistory()
  const [hideDetails, setHideDetails] = useState(true)
  const [showManageOptions, setShowManageOptions] = useState(false)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user || ''
  const {
    event_id,
    created_by,
    created_at,
    image,
    title,
    date,
    time,
    max_participants,
    description,
    street,
    number,
    postal_code,
    city
  } = event

  const showParticipants = () => {
    setShowManageOptions(false)
  }

  const endEvent = () => {
    setShowManageOptions(false)
  }

  const editEvent = () => {
    setShowManageOptions(false)
    history.push(`/event/${event_id}/edit`)
  }

  const handleJoinRequest = async () => {
    try {
      const res = await axios.post(`/api/v1/events/${event_id}/join`)
      const { message } = res.data
      alert(message)
    } catch (error) {
      alert(`Sorry, something went wrong. Please try again.\n\n${error}`)
    }
  }

  return (
    <div className='event'>
      <EventTitle title={title} createdAt={created_at} />

      {user_id === created_by && (
        <FontAwesomeIcon
          onClick={() => setShowManageOptions(!showManageOptions)}
          className='event__manage'
          icon='ellipsis-v'
        />
      )}

      <EventManageDropDown
        modifier={showManageOptions ? 'show' : 'hide'}
        showParticipants={showParticipants}
        endEvent={endEvent}
        editEvent={editEvent}
      />

      <div>
        <EventImage src={image} alt={title} />
        <EventDataBox
          created_by={created_by}
          creatorName={creatorName}
          date={date}
          time={time}
          address={`${street} ${number}, ${postal_code} ${city}`}
          participants={participants}
          max_participants={max_participants}
        />
      </div>

      <div hidden={hideDetails}>
        <p className='event__description'>{description}</p>
        <EventCommentSection eventId={event_id} />
      </div>

      <div className='event__buttons'>
        <Button
          type='button'
          text='Ask to join'
          modifier='primary'
          onClick={handleJoinRequest}
        />
        <Button
          type='button'
          text={hideDetails ? 'View more' : 'View less'}
          modifier='primary'
          onClick={() => setHideDetails(!hideDetails)}
        />
      </div>

      <hr className='event__line' />
    </div>
  )
}

export default Event
