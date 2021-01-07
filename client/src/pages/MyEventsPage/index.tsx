import React from 'react'
import { useLocation } from 'react-router-dom'

import MyEventsSidebar from '../../components/MyEventsSidebar'
import EventParticipant from '../../components/EventParticipant'
import useUserDisplay from '../../hooks/useUserDisplay'
import EventForm from '../../components/EventForm'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const [users] = useUserDisplay()
  const participant = users && users[5]

  const addContent = () => {
    if (pathname.includes('/created'))
      return (
        <EventParticipant
          user={participant && participant}
          handleDelete={() => console.log('ddddd')}
        />
      )
    if (pathname.includes('/interested')) return <p>Requested events here</p>
    if (pathname.includes('/confirmed')) return <p>Confirmed events here</p>
    if (pathname.includes('/create-new')) return <EventForm />
    return null
  }

  return (
    <div className='my-events'>
      <div className='my-events__controls'>
        <MyEventsSidebar />
      </div>
      <div className='my-events__content'>{addContent()}</div>
    </div>
  )
}

export default MyEventsPage
