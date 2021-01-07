import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import MyEventsSidebar from '../../components/MyEventsSidebar'
import Modal from '../../components/Modal'
import EventParticipantsAndRequests from '../../components/EventParticipantsAndRequests'
import EventForm from '../../components/EventForm'
import './MyEventsPage.scss'

const MyEventsPage = () => {
  const { pathname } = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addContent = () => {
    if (pathname.includes('/created'))
      return <p onClick={() => setIsModalOpen(true)}>My events here</p>
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
      <div className='my-events__content'>
        <div>
          {addContent()}
          {isModalOpen && (
            <Modal
              closeModal={() => setIsModalOpen(false)}
              content={<EventParticipantsAndRequests />}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MyEventsPage
