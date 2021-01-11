import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../../components/Modal'
import Event from '../../components/Event'
import EventSearch from '../../components/EventSearch'
import useEventDisplay from '../../hooks/useEventDisplay'
import { EventType } from '../../types'
import './Homepage.scss'

const Homepage = () => {
  const [events] = useEventDisplay()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddRequest = () => {
    console.log('requested!!')
  }

  const toggleSearchModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSearch = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='homepage'>
      <div className='homepage__filter-icon' onClick={toggleSearchModal}>
        <FontAwesomeIcon icon={'filter'} />
      </div>

      <div className='homepage__search-box'>
        <EventSearch
          distance='100'
          handleFieldChange={() => console.log('handled')}
          handleSubmit={handleSearch}
          setAddress={() => console.log('address handler')}
        />
      </div>

      {/* Search box modal for small screens */}
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          content={
            <EventSearch
              distance='30'
              handleFieldChange={() => console.log('handled')}
              handleSubmit={handleSearch}
              setAddress={() => console.log('address handler')}
            />
          }
        />
      )}

      {events ? (
        <div className='homepage__events'>
          {events.map((event: EventType) => (
            <Event
              key={event.created_at}
              event_id={event.event_id}
              title={event.title}
              date={event.date}
              time={event.time}
              description={event.description}
              max_participants={event.max_participants}
              created_by={event.created_by}
              created_at={event.created_at}
              image={event.image}
              street={event.street}
              number={event.number}
              postal_code={event.postal_code}
              city={event.city}
              creatorName={`${event.first_name} ${event.last_name}`}
              participants={event.participants}
              handleAddRequest={handleAddRequest}
            />
          ))}
        </div>
      ) : (
        <h1>Sorry! no events found!!</h1>
      )}
    </div>
  )
}

export default Homepage
