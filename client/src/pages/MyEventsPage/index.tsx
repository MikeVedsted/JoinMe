import React from 'react'
import { useLocation } from 'react-router-dom'

import MyEventsSidebar from '../../components/MyEventsSidebar'
import EventList from '../../components/EventList'
import EventForm from '../../components/EventForm'
import useInterestedEvents from '../../hooks/useInterestedEvents'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const [interestedEvents] = useInterestedEvents()

  const addContent = () => {
    if (pathname.includes('/created')) return <p>My events here</p>
    if (pathname.includes('/interested'))
      return (
        <EventList
          title={'Events you have requested to join'}
          events={interestedEvents}
        />
      )
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
