import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import MyEventsSidebar from '../../components/MyEventsSidebar'
import EventForm from '../../components/EventForm'
import './MyEventsPage.scss'

const LandingPage = () => {
  const { pathname } = useLocation()

  const addContent = () => {
    if (pathname === '/my-events/my-events') return <p>My events here</p>
    if (pathname === '/my-events/interested-events')
      return <p>Requested events here</p>
    if (pathname === '/my-events/confirmed-events')
      return <p>Confirmed events here</p>
    if (pathname === '/my-events/create-event') return <EventForm />
    return null
  }

  return (
    <div className='my-events'>
      <div className='my-events__left-column'>
        <MyEventsSidebar />
      </div>
      <div className='my-events__right-column'>{addContent()}</div>
    </div>
  )
}

export default LandingPage
