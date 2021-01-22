import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../../components/Modal'
import Event from '../../components/Event'
import EventSearch from '../../components/EventSearch'
import useEventDisplay from '../../hooks/useEventDisplay'
import './Homepage.scss'

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    allEvents,
    handleFieldChange,
    handleAddressChange,
    handleSearch
  } = useEventDisplay()

  const toggleSearchModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='homepage'>
      <div className='homepage__filter-icon' onClick={toggleSearchModal}>
        <FontAwesomeIcon icon={'filter'} />
      </div>

      <div className='homepage__search-box'>
        <EventSearch
          distance='100'
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSearch}
          setAddress={handleAddressChange}
        />
      </div>

      {/* Search box modal for small screens */}
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          content={
            <EventSearch
              distance='30'
              handleFieldChange={handleFieldChange}
              handleSubmit={handleSearch}
              setAddress={handleAddressChange}
            />
          }
        />
      )}

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
