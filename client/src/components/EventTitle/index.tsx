import React from 'react'

import { calculateEventAge } from '../../util/helperFunctions'
import { EventTitleProps } from '../../types'
import './EventTitle.scss'

const EventTitle = ({ title, createdAt }: EventTitleProps) => {
  return (
    <h3 className='title'>
      {title}
      <span className='title__time'>{calculateEventAge(createdAt)} ago</span>
    </h3>
  )
}

export default EventTitle
