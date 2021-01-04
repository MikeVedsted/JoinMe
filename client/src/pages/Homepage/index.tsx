import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Event from '../../components/Event'
import EventSearch from '../../components/EventSearch'
import Modal from '../../components/Modal'
import useEventDisplay from '../../hooks/useEventDisplay'
import { EventType } from '../../types'
import './Homepage.scss'

const Homepage = () => {
  const [events] = useEventDisplay()
  const [address, setAddress] = useState({})

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
          setAddress={setAddress}
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
              setAddress={setAddress}
            />
          }
        />
      )}

      {events ? (
        <div className='homepage__events'>
          {events.map((event: EventType) => (
            <Event
              key={event.created_at}
              created_at={event.created_at}
              created_by={event.created_by}
              image='https://ichef.bbci.co.uk/news/624/cpsprodpb/1384/production/_111769940_whatsubject.jpg'
              title={event.title}
              date={event.date}
              time={event.time}
              address={'markkinatie 15 00700 Helsinki'}
              participants={11}
              max_participants={event.max_participants}
              description={event.description}
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
