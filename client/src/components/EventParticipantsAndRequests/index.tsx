import React, { useState } from 'react'

import Button from '../../components/Button'
import EventParticipant from '../../components/EventParticipant'
import EventJoinRequest from '../EventJoinRequest'
import {
  EventParticipantsAndRequestsProps,
  Participant,
  Requester
} from '../../types'
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
          {participants.length > 0 ? (
            participants.map((participant: Participant) => (
              <EventParticipant
                key={participant.user_id}
                participant={participant}
              />
            ))
          ) : (
            <h2 className='participants__not-found'>
              Sorry! No participants yet.
            </h2>
          )}
        </div>
      ) : (
        <div className='participants__list participants__list--new-requests'>
          {joinRequests.length > 0 ? (
            joinRequests.map((participant: Requester) => (
              <EventJoinRequest
                key={participant.user_id}
                requester={participant}
              />
            ))
          ) : (
            <h2 className='participants__not-found'>
              Sorry! No join requests yet.
            </h2>
          )}
        </div>
      )}
    </div>
  )
}

export default EventParticipantsAndRequests
