import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import EventCommentSection from '../EventCommentSection'
import EventManageDropDown from '../EventManageDropDown'
import { requestToJoin } from '../../redux/actions'
import { AppState, EventProps } from '../../Types'
import './Event.scss'

const Event = ({ event }: EventProps) => {
  const { event_id, created_by, created_at, image, title, description } = event
  const { user_id } = useSelector((state: AppState) => state.user)
  const [hideManageOptions, setHideManageOptions] = useState(true)
  const [hideDetails, setHideDetails] = useState(true)
  const dispatch = useDispatch()

  return (
    <div className='event'>
      {user_id === created_by && (
        <FontAwesomeIcon
          onClick={() => setHideManageOptions(!hideManageOptions)}
          className='event__manage'
          icon='ellipsis-v'
        />
      )}
      <EventManageDropDown eventId={event_id} hide={hideManageOptions} />

      <EventTitle title={title} createdAt={created_at} />

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
          onClick={() => dispatch(requestToJoin(event_id))}
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
