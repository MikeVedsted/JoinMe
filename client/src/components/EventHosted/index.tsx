import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Modal from '../Modal'
import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventCommentSection from '../EventCommentSection'
import { EventProps } from '../../types'
import './HostedEvent.scss'

const EventHosted = ({ event }: EventProps) => {
  const history = useHistory()
  const [hideComments, setHideComments] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const { event_id, created_at, image, title } = event

  const populateModal = () => {
    if (modalContent === 'participants')
      return <p>Participant handling from PR #246 once it has been merged </p>
    if (modalContent === 'cancel')
      return <p>Chiran&apos;s cancel content here, once it has been merged</p>
    return (
      <p>Error - Please try again and let us know what you did to get here</p>
    )
  }

  const handleModal = (e: any) => {
    setModalContent(e.target.id)
    setShowModal(true)
  }

  return (
    <div className='hosted-event'>
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          content={populateModal()}
        />
      )}

      <EventTitle title={title} createdAt={created_at} />
      <div className='hosted-event__content'>
        <EventImage src={image} alt={title} />
        <div className='hosted-event__buttons'>
          <Button
            type='button'
            text='Manage participants'
            modifier='primary'
            id='participants'
            onClick={(e) => handleModal(e)}
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
            onClick={(e) => handleModal(e)}
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
