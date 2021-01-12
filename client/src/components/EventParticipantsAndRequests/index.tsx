import React, { useState } from 'react'

import Button from '../../components/Button'
import EventParticipant from '../../components/EventParticipant'
import EventJoinRequest from '../EventJoinRequest'
import { EventParticipantsAndRequestsProps, UserType } from '../../types'
import './EventParticipantsAndRequests.scss'

const EventParticipantsAndRequests = ({
  participants,
  joinRequests
}: EventParticipantsAndRequestsProps) => {
  const [listView, setListView] = useState('participants')

  return (
    <div className='participants'>
      <div className='participants__buttons'>
        <Button
          type='button'
          text='Participants'
          modifier={listView !== 'participants' ? 'disabled' : undefined}
          onClick={() => setListView('participants')}
        />
        <Button
          type='button'
          text='New Requests'
          modifier={listView !== 'requests' ? 'disabled' : undefined}
          onClick={() => setListView('requests')}
        />
      </div>
      <hr className='participants__hr' />
      {listView === 'participants' ? (
        <div className='participants__list'>
          {participants.map((participant: UserType) => (
            <EventParticipant
              key={participant.user_id}
              user={participant}
              handleDelete={() => null}
            />
          ))}
        </div>
      ) : (
        <div className='participants__list participants__list--new-requests'>
          {joinRequests.map((participant: UserType) => (
            <EventJoinRequest key={participant.user_id} user={participant} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventParticipantsAndRequests
