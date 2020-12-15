import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import Button from '../Button'
import FormInputFiled from '../FormInputField'
import { EventType } from '../../types'
import './Event.scss'

const Event = ({
  event_id,
  created_by,
  created_at,
  image,
  title,
  date,
  time,
  address,
  participants,
  max_participants,
  description
}: EventType) => {
  const [details, setDetails] = useState(true)

  const changeView = () => {
    if (details) {
      setDetails(false)
    } else {
      setDetails(true)
    }
  }

  const calculateTime = () => {
    const diff = new Date().getTime() - new Date(created_at).getTime()
    const hours = parseInt((diff / 3600000).toFixed(0))
    if (hours <= 24) {
      return hours + 'h'
    } else if (hours > 24 && hours <= 730) {
      const days = (hours / 24).toFixed(0)
      return days + 'd'
    } else if (hours > 730 && hours <= 8640) {
      const months = (hours / 730).toFixed()
      return months + 'm'
    } else {
      const years = (hours / 8640).toFixed(0)
      return years + 'y'
    }
  }
  const eventCreatedBefore = calculateTime()

  return (
    <div className='event'>
      <title className='title'>
        <p className='title__text title__text--head'>{title}</p>
        <p className='title__text title__text--time'>{eventCreatedBefore}</p>
      </title>
      <div className='event__dataBox'>
        <img className='event__image' src={image} alt={title} />
        <div className='event__infoBox'>
          <div className='event__info'>
            <FontAwesomeIcon
              className='event__infoText event__infoText--icon'
              icon={faUserShield}
            />
            <p className='event__infoText'>{created_by}</p>
          </div>
          <div className='event__info'>
            <FontAwesomeIcon
              className='event__infoText event__infoText--icon'
              icon={faCalendar}
            />
            <p className='event__infoText'>{date}</p>
          </div>
          <div className='event__info'>
            <FontAwesomeIcon
              className='event__infoText event__infoText--icon'
              icon={faClock}
            />
            <p className='event__infoText'>{time}</p>
          </div>
          <div className='event__info'>
            <FontAwesomeIcon
              className='event__infoText event__infoText--icon'
              icon={faMapMarkerAlt}
            />
            <p className='event__infoText'>{address}</p>
          </div>
          <div className='event__info'>
            <FontAwesomeIcon
              className='event__infoText event__infoText--icon'
              icon={faUsers}
            />
            <span className='event__infoText'>{`${participants}/`}</span>
            <span className='event__infoText event__infoText--total'>
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
        <p className='event__dText'>{description}</p>
        <div className='event__comments'>comments comes here</div>
        <FormInputFiled
          type='text'
          id='comment'
          label=''
          placeholder='Write a comment or ask a question to the creator'
        />
      </div>
      <div className='event__actions'>
        <Button
          type='button'
          text='Ask to join'
          style='primary'
          handleClick={() => console.log('clicked!!')}
        />
        <Button
          type='button'
          text={details ? 'View less' : 'View more'}
          style='primary'
          handleClick={changeView}
        />
      </div>
      <hr className='event__line' />
    </div>
  )
}

export default Event
