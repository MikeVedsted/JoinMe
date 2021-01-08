import React from 'react'
import { useLocation } from 'react-router-dom'

import MyEventsSidebar from '../../components/MyEventsSidebar'
import EventList from '../../components/EventList'
import EventForm from '../../components/EventForm'
import useParticipatingEvents from '../../hooks/useParticipatingEvents'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const [participatingEvents] = useParticipatingEvents()

  const addContent = () => {
    if (pathname.includes('/created')) return <p>My events here</p>
    if (pathname.includes('/interested')) return <p>Requested events here</p>
    if (pathname.includes('/'))
      return (
        <EventList
          events={participatingEvents}
          title={'Events you are registered for'}
        />
      )
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
