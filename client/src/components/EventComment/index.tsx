import React from 'react'

import { CommentProps } from '../../types'
import './EventComment.scss'

const EventComment = ({ image, user, text, date }: CommentProps) => {
  return (
    <div className='comment'>
      <img src={image} alt={user} className='comment__image' />
      <div className='comment__text'>
        <h3 className='comment__text--user'>
          {user + ' '}
          <span className='comment__text--date'>({date})</span>
        </h3>
        <p className='comment__text--comment'>{text}</p>
      </div>
    </div>
  )
}

export default EventComment
