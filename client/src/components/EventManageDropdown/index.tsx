import React from 'react'

import { EventManageDropdownProps } from '../../types'
import './EventManageDropdown.scss'

const EventManageDropdown = ({
  showParticipants,
  endEvent,
  editEvent
}: EventManageDropdownProps) => {
  return (
    <div className='dropdown'>
      <p onClick={showParticipants} className='dropdown__item'>
        Participants
      </p>
      <p onClick={endEvent} className='dropdown__item'>
        End event
      </p>
      <p onClick={editEvent} className='dropdown__item'>
        Edit event
      </p>
    </div>
  )
}

export default EventManageDropdown
