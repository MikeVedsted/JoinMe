import React, { useState } from 'react'

import Button from '../../components/Button'
import EventParticipant from '../../components/EventParticipant'
import './EventParticipantsAndRequests.scss'

const EventParticipantsAndRequests = () => {
  const [listView, setListView] = useState('participants')
  const user = {
    user_id: '3a568d60-2535-4bd1-9d52-a1c917dd75ea',
    first_name: 'Rost',
    last_name: 'Petrenko',
    email: 'rost@gmail.com',
    profile_image:
      'https://www.ikea.com/us/en/images/products/klappa-soft-toy-ball-multicolor__0873092_PE682669_S5.JPG?f=s',
    profile_text: 'Test user Rost',
    base_address: '97f23124-1bb9-415a-b575-84c1ab6b76d5',
    created_at: '2020-12-10T08:23:55.933Z'
  }
  const user2 = {
    user_id: 'c1beee02-0fd1-435c-84bb-66c25c3d55a8',
    first_name: 'chiranjibi',
    last_name: 'chapagain',
    email: 'chiranjibichapagain@gmail.com',
    profile_image:
      'https://lh3.googleusercontent.com/a-/AOh14GiB0ZPfaeelY-DlkwZ-0g5E6EB0X0lYCh6anymv6w=s96-c',
    profile_text: 'test text',
    base_address: '97f23124-1bb9-415a-b575-84c1ab6b76d5',
    created_at: '2020-12-16T11:15:58.669Z'
  }

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

      {listView === 'participants' ? (
        <div className='participants__list'>
          <EventParticipant user={user} handleDelete={() => null} />
          <EventParticipant user={user} handleDelete={() => null} />
          <EventParticipant user={user} handleDelete={() => null} />
          <EventParticipant user={user} handleDelete={() => null} />
          <EventParticipant user={user} handleDelete={() => null} />
        </div>
      ) : (
        <div className='participants__list'>
          <EventParticipant user={user2} handleDelete={() => null} />
          <EventParticipant user={user2} handleDelete={() => null} />
          <EventParticipant user={user2} handleDelete={() => null} />
          <EventParticipant user={user2} handleDelete={() => null} />
          <EventParticipant user={user2} handleDelete={() => null} />
        </div>
      )}
    </div>
  )
}

export default EventParticipantsAndRequests
