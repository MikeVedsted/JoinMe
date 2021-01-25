import React from 'react'

import { EventManageDropDownProps } from '../../Types'
import './EventManageDropDown.scss'

const EventManageDropDown = ({
  showParticipants,
  endEvent,
  editEvent,
  modifier
}: EventManageDropDownProps) => {
  return (
    <div className={`drop-down drop-down--${modifier}`}>
      <p onClick={showParticipants} className='drop-down__item'>
        Participants
      </p>
      <p onClick={endEvent} className='drop-down__item'>
        End event
      </p>
      <p onClick={editEvent} className='drop-down__item'>
        Edit event
      </p>
    </div>
  )
}

export default EventManageDropDown
