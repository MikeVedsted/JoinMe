import React from 'react'

import { calculateEventAge } from '../../util/helperFunctions'
import { EventTitleProps } from '../../types'
import './EventTitle.scss'

const EventTitle = ({ title, createdAt }: EventTitleProps) => {
  return (
    <h3 className='event-title'>
      {title + ' '}
      <span className='event-title__time'>
        {calculateEventAge(createdAt)} ago
      </span>
    </h3>
  )
}

export default EventTitle
