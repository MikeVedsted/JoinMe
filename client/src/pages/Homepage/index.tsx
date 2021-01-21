import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../../components/Modal'
import EventList from '../../components/EventList'
import NotFound from '../../components/NotFound'
import EventSearch from '../../components/EventSearch'
import useEventDisplay from '../../hooks/useEventDisplay'
import './Homepage.scss'

// TO DO
// Move modal handling to state
// Add loading for event list once ready

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    allEvents,
    handleFieldChange,
    handleAddressChange,
    handleSearch
  } = useEventDisplay()

  const largeScreen = () => {
    return window.innerWidth < 769
  }

  return (
    <div className='homepage'>
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

      <div className='homepage__left-column'>
        <div
          hidden={!largeScreen()}
          className='homepage__filter-icon'
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <FontAwesomeIcon icon={'filter'} />
        </div>

        <div hidden={largeScreen()} className='homepage__search-box'>
          <EventSearch
            distance='100'
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSearch}
            setAddress={handleAddressChange}
          />
        </div>
      </div>
      <div className='homepage__right-column'>
        {allEvents && allEvents.length > 0 ? (
          <EventList events={allEvents} />
        ) : (
          <NotFound message='Sorry, not events found.' />
        )}
      </div>
    </div>
  )
}

export default Homepage
