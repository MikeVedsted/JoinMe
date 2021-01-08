import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../Button'
import EventCommentSection from '../EventCommentSection'
import EventManageDropDown from '../../components/EventManageDropDown'
import { calculateEventAge } from '../../util/helperFunctions'
import { EventType, UserType } from '../../types'
import './Event.scss'

const Event = ({
  event_id,
  created_by,
  creatorName,
  created_at,
  image,
  title,
  date,
  time,
  participants,
  max_participants,
  description,
  street,
  number,
  postal_code,
  city,
  handleAddRequest
}: EventType) => {
  const [details, setDetails] = useState(false)
  const [showManageOptions, setShowManageOptions] = useState(false)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user || ''

  const formattedTime = time.slice(0, 5)
  const formattedDate = date.slice(0, 10).split('-').reverse().join('-')

  const showParticipants = () => {
    setShowManageOptions(false)
  }

  const endEvent = () => {
    setShowManageOptions(false)
  }

  const editEvent = () => {
    setShowManageOptions(false)
  }

  return (
    <div className='event'>
      <title className='title'>
        <div className='title__wrapper'>
          <p className='title__text title__text--head'>{title}</p>
          <p className='title__text title__text--time'>
            {calculateEventAge(created_at)}
          </p>
        </div>
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
      </title>
      <div className='event__data-box'>
        <img className='event__image' src={image} alt={title} />
        <div className='event__info-box'>
          <div className='event__info'>
            <div className='event__icon-wrapper'>
              <FontAwesomeIcon
                className='event__info-text event__info-text--icon'
                icon='user-shield'
              />
            </div>
            <Link className='event__link' to={`/user/${created_by}`}>
              <p className='event__info-text event__info-text--clickable'>
                {creatorName}
              </p>
            </Link>
          </div>
          <div className='event__info'>
            <div className='event__icon-wrapper'>
              <FontAwesomeIcon
                className='event__info-text event__info-text--icon'
                icon='calendar'
              />
            </div>
            <p className='event__info-text'>{formattedDate}</p>
          </div>
          <div className='event__info'>
            <div className='event__icon-wrapper'>
              <FontAwesomeIcon
                className='event__info-text event__info-text--icon'
                icon='clock'
              />
            </div>
            <p className='event__info-text'>{formattedTime}</p>
          </div>
          <div className='event__info'>
            <div className='event__icon-wrapper'>
              <FontAwesomeIcon
                className='event__info-text event__info-text--icon'
                icon='map-marker-alt'
              />
            </div>
            <p className='event__info-text'>{`${street} ${number}, ${postal_code} ${city}`}</p>
          </div>
          <div className='event__info'>
            <div className='event__icon-wrapper'>
              <FontAwesomeIcon
                className='event__info-text event__info-text--icon'
                icon='user'
              />
            </div>
            <span className='event__info-text'>{`${participants}/`}</span>
            <span className='event__info-text event__info-text--total'>
              {max_participants}
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          details ? 'event__details' : 'event__details event__details--hide '
        }
      >
        <p className='event__d-text'>{description}</p>
        <EventCommentSection eventId={event_id} />
      </div>
      <div className='event__actions'>
        <Button
          type='button'
          text='Ask to join'
          modifier='primary'
          onClick={handleAddRequest}
        />
        <Button
          type='button'
          text={details ? 'View less' : 'View more'}
          modifier='primary'
          onClick={() => setDetails(!details)}
        />
      </div>
      <hr className='event__line' />
    </div>
  )
}

export default Event
