import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../../components/Modal'
import Event from '../../components/Event'
import EventSearch from '../../components/EventSearch'
import { AppState } from '../../Types'
import './Homepage.scss'

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { allEvents } = useSelector((state: AppState) => state.event)
  const toggleSearchModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='homepage'>
      <div className='homepage__filter-icon' onClick={toggleSearchModal}>
        <FontAwesomeIcon icon={'filter'} />
      </div>

      <div className='homepage__search-box'>
        <EventSearch distance='100' />
      </div>

      {/* Search box modal for small screens */}
      {isModalOpen && <Modal content={<EventSearch distance='30' />} />}

      {allEvents ? (
        <div className='homepage__events'>
          {allEvents.map((event: any) => (
            <Event key={event.created_at} event={event} />
          ))}
        </div>
      ) : (
        <h1>Sorry! no events found!!</h1>
      )}
    </div>
  )
}

export default Homepage
