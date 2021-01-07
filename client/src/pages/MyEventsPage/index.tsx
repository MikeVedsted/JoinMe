import React from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import NotFound from '../../components/NotFound'
import EventList from '../../components/EventList'
import EventForm from '../../components/EventForm'
import MyEventsSidebar from '../../components/MyEventsSidebar'
import useHostedEvents from '../../hooks/useHostedEvents'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user
  const [hostedEvents] = useHostedEvents(user_id)

  const addContent = () => {
    if (pathname.includes('/hosted'))
      return (
        <EventList events={hostedEvents} title={'Events you are hosting'} />
      )
    if (pathname.includes('/interested')) return <p>Requested events here</p>
    if (pathname.includes('/confirmed')) return <p>Confirmed events here</p>
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
