import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import NotFound from '../../components/NotFound'
import EventList from '../../components/EventList'
import EventForm from '../../components/EventForm'
import MyEventsSidebar from '../../components/MyEventsSidebar'
import { AppState } from '../../Types'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const { hostedEvents, requestedEvents, confirmedEvents } = useSelector(
    (state: AppState) => state.event
  )

  const addContent = () => {
    if (pathname.includes('/hosted'))
      return (
        <EventList
          type='hosted'
          title='Events you are hosting'
          events={hostedEvents}
        />
      )
    if (pathname.includes('/interested'))
      return (
        <EventList
          type='interested'
          title='Events you have requested to join'
          events={requestedEvents}
        />
      )
    if (pathname.includes('/confirmed'))
      return (
        <EventList
          type='confirmed'
          title='Events you are registered for'
          events={confirmedEvents}
        />
      )
    if (pathname.includes('/create-new')) return <EventForm />
    return (
      <NotFound message='Nothing to display here. Select an option from the menu.' />
    )
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

export default MyEventsPage
