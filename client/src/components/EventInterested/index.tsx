import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../Modal'
import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import ModalMessageCancel from '../ModalMessageCancel'
import EventCommentSection from '../EventCommentSection'
import { cancelJoinRequest, closeModal, toggleModal } from '../../redux/actions'
import { EventProps, AppState } from '../../Types'
import './EventInterested.scss'

const EventInterested = ({ event }: EventProps) => {
  const { event_id, created_at, image, title, description, er_id } = event
  const { hideModal } = useSelector((state: AppState) => state.ui)
  const [hideComments, setHideComment] = useState(true)
  const dispatch = useDispatch()

  return (
    <div className='interested-event'>
      {!hideModal && (
        <Modal
          content={
            <ModalMessageCancel
              title={`Are you sure you want to cancel you request?`}
              confirmFunction={() => dispatch(cancelJoinRequest(er_id))}
              cancelFunction={() => dispatch(closeModal())}
            />
          }
        />
      )}

      <EventTitle title={title} createdAt={created_at} />

      <div>
        <EventImage src={image} alt={title} />
        <EventDataBox event={event} />
      </div>

      <p className='interested-event__description'>{description}</p>

      <div className='interested-event__buttons'>
        <Button
          type='button'
          text='Cancel request'
          modifier='primary'
          onClick={() => dispatch(toggleModal(hideModal))}
        />
        <Button
          type='button'
          text={hideComments ? 'View comments' : 'Hide comments'}
          modifier='primary'
          onClick={() => setHideComment(!hideComments)}
        />
      </div>

      <div hidden={hideComments}>
        <EventCommentSection eventId={event_id} />
      </div>

      <hr className='interested-event__line' />
    </div>
  )
}

export default EventInterested
