import React from 'react'
import { Link } from 'react-router-dom'

import ProfileImage from '../ProfileImage'
import { calculateEventAge } from '../../util/helperFunctions'
import { CommentProps } from '../../Types'
import './EventComment.scss'

const EventComment = ({ image, name, id, text, date }: CommentProps) => {
  return (
    <div className='comment'>
      <ProfileImage image={image} alt={name} />
      <div>
        <Link to={`/user/${id}`} className='comment__link'>
          <h3 className='comment__user'>
            {name + ' '}
            <span className='comment__date'>
              {calculateEventAge(date)}
              {' ago'}
            </span>
          </h3>
        </Link>
        <p className='comment__text'>{text}</p>
      </div>
    </div>
  )
}

export default EventComment
