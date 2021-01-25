import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../../components/Modal'
import NotFound from '../../components/NotFound'
import EventList from '../../components/EventList'
import EventSearch from '../../components/EventSearch'
import MobileSearchToggle from '../../components/MobileSearchToggle'
import useEventDisplay from '../../hooks/useEventDisplay'
import { screenGreaterThan } from '../../util/helperFunctions'
import { AppState } from '../../Types'
import './Homepage.scss'

const Homepage = () => {
  const { allEvents } = useSelector((state: AppState) => state.event)
  const { hideModal } = useSelector((state: AppState) => state.ui)
  
  return (
    <div className='homepage'>
      <MobileSearchToggle />

      {/* Search box modal for small screens */}
      {!hideModal && (
        <Modal content={<EventSearch distance='30' />} />
      )}

      <div className='homepage__left-column' hidden={!screenGreaterThan(768)}>
        <EventSearch distance='100'/>
      </div>
      <div className='homepage__right-column'>
        {allEvents && allEvents.length > 0 ? (
          <EventList events={allEvents} />
        ) : (
          <NotFound message='Sorry, no events found.' />
        )}
      </div>
    </div>
  )
}

export default Homepage
