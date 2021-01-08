import React from 'react'
import { useLocation } from 'react-router-dom'

import MyEventsSidebar from '../../components/MyEventsSidebar'
import EventForm from '../../components/EventForm'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()

  const addContent = () => {
    if (pathname.includes('/created')) return <p>My events here</p>
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
