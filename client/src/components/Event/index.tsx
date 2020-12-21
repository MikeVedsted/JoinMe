import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwt from 'jsonwebtoken'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../Button'
import FormInputFiled from '../FormInputField'
import useUserDisplay from '../../hooks/useUserDisplay'
import { calculateEventAge } from '../../util/helperFunctions'
import { EventType } from '../../types'
import './Event.scss'

const Event = ({
  created_by,
  created_at,
  image,
  title,
  date,
  time,
  address,
  participants,
  max_participants,
  description,
  handleAddRequest
}: EventType) => {
  const [details, setDetails] = useState(false)
  // const [cookies, setCookie] = useCookies(['x-auth-token'])
  // const decodedToken = jwt.decode(cookies['x-auth-token'])
  // const userId = decodedToken?.sub

  const [users] = useUserDisplay()

  const changeView = () => {
    setDetails(!details)
  }
  const formattedTime = time.slice(0, 5)
  const formattedDate = date.slice(0, 10).split('-').reverse().join('-')

  const eventCreator = users.find((user: any) => user.user_id === created_by)
  console.log('find perosn-', eventCreator)

  return (
    <div className='event'>
      <title className='title'>
        <p className='title__text title__text--head'>{title}</p>
        <p className='title__text title__text--time'>
          {calculateEventAge(created_at)}
        </p>
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
            <Link className='event__link' to={`/${eventCreator}`}>
              <p className='event__info-text event__info-text--clickable'>
                {`${eventCreator.first_name}  ${eventCreator.last_name}`}
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
            <p className='event__info-text'>{address}</p>
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
          modifier='primary'
          handleClick={handleAddRequest}
        />
        <Button
          type='button'
          text={details ? 'View less' : 'View more'}
          modifier='primary'
          handleClick={changeView}
        />
      </div>
      <hr className='event__line' />
    </div>
  )
}

export default Event
