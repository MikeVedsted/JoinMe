import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../Modal'
import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import ModalMessageCancel from '../ModalMessageCancel'
import EventCommentSection from '../EventCommentSection'
import EventParticipantsAndRequests from '../EventParticipantsAndRequests'
import useEventParticipants from '../../hooks/useEventParticipants'
import useEventRequests from '../../hooks/useEventRequests'
import { closeModal, endEvent, toggleModal } from '../../redux/actions'
import { AppState, EventProps } from '../../Types'
import './HostedEvent.scss'

const EventHosted = ({ event }: EventProps) => {
  const { hideModal } = useSelector((state: AppState) => state.ui)
  const { event_id, created_at, image, title } = event
  const [participants] = useEventParticipants(event_id)
  const [requests] = useEventRequests(event_id)
  const [hideComments, setHideComments] = useState(true)
  const [modalContent, setModalContent] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const populateModal = (content: string) => {
    if (content === 'participants')
      return (
        <EventParticipantsAndRequests
          joinRequests={requests}
          participants={participants}
        />
      )
    if (content === 'cancel')
      return (
        <ModalMessageCancel
          title={`Are you sure you want to cancel the event: ${title}?`}
          additionalText='The event, including comments and participant information, will be permanently deleted and it cannot be undone.'
          confirmFunction={() => dispatch(endEvent(event_id))}
          cancelFunction={() => dispatch(closeModal())}
        />
      )
  }

  const handleModal = (id: string) => {
    setModalContent(id)
    dispatch(toggleModal(hideModal))
  }

  return (
    <div className='hosted-event'>
      {!hideModal && <Modal content={populateModal(modalContent)} />}

      <EventTitle title={title} createdAt={created_at} />

      <div className='hosted-event__content'>
        <EventImage src={image} alt={title} />

        <div className='hosted-event__buttons'>
          <Button
            type='button'
            text='Manage participants'
            modifier='primary'
            id='participants'
            onClick={(e) => handleModal(e.target.id)}
          />
          <Button
            type='button'
            text='Edit event'
            modifier='primary'
            onClick={() => history.push(`/event/${event_id}/edit`)}
          />
          <Button
            type='button'
            text='Cancel event'
            modifier='primary'
            id='cancel'
            onClick={(e) => handleModal(e.target.id)}
          />
          <Button
            type='button'
            text='Comments'
            modifier='primary'
            onClick={() => setHideComments(!hideComments)}
          />
        </div>
      </div>

      <div hidden={hideComments}>
        <EventCommentSection eventId={event_id} />
      </div>

      <hr className='hosted-event__line' />
    </div>
  )
}

export default EventHosted
