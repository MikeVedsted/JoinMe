import React from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import NotFound from '../../components/NotFound'
import EventList from '../../components/EventList'
import EventForm from '../../components/EventForm'
import MyEventsSidebar from '../../components/MyEventsSidebar'
import useParticipatingEvents from '../../hooks/useParticipatingEvents'
import useRequestedEvents from '../../hooks/useRequestedEvents'
import useHostedEvents from '../../hooks/useHostedEvents'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user
  const [requestedEvents] = useRequestedEvents()
  const [participatingEvents] = useParticipatingEvents()
  const [hostedEvents] = useHostedEvents(user_id)

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
          events={participatingEvents}
        />
      )
    if (pathname.includes('/create-new')) return <EventForm />
    return (
      <NotFound message='Nothing to display here. Select an option from the menu.' />
    )
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
