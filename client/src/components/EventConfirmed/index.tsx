import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../Modal'
import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import ModalMessageCancel from '../ModalMessageCancel'
import EventCommentSection from '../EventCommentSection'
import { toggleModal, leaveEvent, closeModal } from '../../redux/actions'
import { EventProps, AppState } from '../../Types'
import './EventConfirmed.scss'

const EventConfirmed = ({ event }: EventProps) => {
  const { event_id, created_at, image, title, description, ep_id } = event
  const { hideModal } = useSelector((state: AppState) => state.ui)
  const [hideComments, setHideComment] = useState(true)
  const [hideDetails, setHideDetails] = useState(true)
  const dispatch = useDispatch()

  const handleToggle = (id: string) => {
    if (id === 'details') {
      setHideComment(true)
      setHideDetails(!hideDetails)
    }
    if (id === 'comments') {
      setHideDetails(true)
      setHideComment(!hideComments)
    }
  }

  return (
    <div className='confirmed-event'>
      {!hideModal && (
        <Modal
          content={
            <ModalMessageCancel
              title='Are you sure you want to leave the event?'
              additionalText='You can request to join again later but will not necessarily be accepted'
              confirmFunction={() => dispatch(leaveEvent(ep_id))}
              cancelFunction={() => dispatch(closeModal())}
            />
          }
        />
      )}

      <EventTitle title={title} createdAt={created_at} />

      <div className='confirmed-event__content'>
        <EventImage src={image} alt={title} />

        <div className='confirmed-event__buttons'>
          <Button
            type='button'
            text='Leave event'
            modifier='primary'
            onClick={() => dispatch(toggleModal(hideModal))}
          />

          <Button
            type='button'
            text={hideDetails ? 'View details' : 'Hide details'}
            modifier='primary'
            id='details'
            onClick={(e) => handleToggle(e.target.id)}
          />

          <Button
            type='button'
            text={hideComments ? 'View comments' : 'Hide comments'}
            modifier='primary'
            id='comments'
            onClick={(e) => handleToggle(e.target.id)}
          />
        </div>
      </div>

      <div hidden={hideComments}>
        <EventCommentSection eventId={event_id} />
      </div>

      <div
        hidden={hideDetails}
        className={!hideDetails ? 'confirmed-event__details' : ''}
      >
        <EventDataBox event={event} />

        <p className='confirmed-event__description'>{description}</p>
      </div>

      <hr className='confirmed-event__line' />
    </div>
  )
}

export default EventConfirmed
