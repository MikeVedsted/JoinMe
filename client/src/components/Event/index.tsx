import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'
import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import ModalMessageCancel from '../ModalMessageCancel'
import EventCommentSection from '../EventCommentSection'
import EventManageDropDown from '../EventManageDropDown'
import EventParticipantAndRequests from '../EventParticipantsAndRequests'
import useEventParticipants from '../../hooks/useEventParticipants'
import useEventRequests from '../../hooks/useEventRequests'
import { EventProps } from '../../Types'
import './Event.scss'

const Event = ({ event }: EventProps) => {
  const history = useHistory()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false)
  const [hideDetails, setHideDetails] = useState(true)
  const [showManageOptions, setShowManageOptions] = useState(false)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user || ''
  const { event_id, created_by, created_at, image, title, description } = event
  const [participants] = useEventParticipants(event_id)
  const [requests] = useEventRequests(event_id)

  const showParticipants = () => {
    setShowManageOptions(false)
    setIsParticipantsModalOpen(true)
  }

  const endEvent = () => {
    setShowManageOptions(false)
    setIsConfirmModalOpen(true)
  }

  const editEvent = () => {
    setShowManageOptions(false)
    history.push(`/event/${event_id}/edit`)
  }

  const handleJoinRequest = async () => {
    try {
      const { data } = await axios.post(`/api/v1/events/${event_id}/request`)
      const { message } = data
      alert(message)
    } catch (error) {
      alert(`Sorry, something went wrong. Please try again.\n\n${error}`)
    }
  }

  const handleEndEvent = async () => {
    try {
      await axios.delete(`/api/v1/events/${event_id}`)
      setIsConfirmModalOpen(false)
      alert('Event Successfully Deleted!')
    } catch (error) {
      alert(`Sorry, something went wrong. Please try again.\n\n${error}`)
    }
  }

  return (
    <div className='event'>
      {isConfirmModalOpen && (
        <Modal
          // closeModal={() => setIsConfirmModalOpen(false)}
          content={
            <ModalMessageCancel
              title={`Are you sure you want to cancel the event: ${title}?`}
              additionalText='The event, including comments and participant information, will be permanently deleted and it cannot be undone.'
              confirmFunction={handleEndEvent}
              cancelFunction={() => setIsConfirmModalOpen(false)}
            />
          }
        />
      )}

      {isParticipantsModalOpen && (
        <Modal
          // closeModal={() => setIsParticipantsModalOpen(false)}
          content={
            <EventParticipantAndRequests
              participants={participants}
              joinRequests={requests}
            />
          }
        />
      )}

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
        <EventDataBox event={event} />
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
