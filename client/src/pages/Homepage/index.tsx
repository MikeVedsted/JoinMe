import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../../components/Modal'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'
import EventList from '../../components/EventList'
import EventSearch from '../../components/EventSearch'
import MobileSearchToggle from '../../components/MobileSearchToggle'
import { screenGreaterThan } from '../../util/helperFunctions'
import { AppState } from '../../Types'
import { getMyEvents } from '../../redux/actions'
import './Homepage.scss'

const Homepage = () => {
  const dispatch = useDispatch()
  const { user_id } = useSelector((state: AppState) => state.user)
  const { allEvents } = useSelector((state: AppState) => state.event)
  const { hideModal } = useSelector((state: AppState) => state.ui)
  const { loading } = useSelector((state: AppState) => state.loading)
  const [mobileSearch, setMobileSearch] = useState(false)

  useEffect(() => {
    dispatch(getMyEvents(user_id))
  }, [user_id])

  return (
    <div className='homepage'>
      <MobileSearchToggle toggle={setMobileSearch} state={mobileSearch} />

      {!hideModal && mobileSearch && (
        <Modal content={<EventSearch distance='30' />} />
      )}

      <div className='homepage__left-column' hidden={!screenGreaterThan(768)}>
        <EventSearch distance='100' />
      </div>

      <div className='homepage__right-column'>
        {loading ? (
          <Loading />
        ) : allEvents && allEvents.length > 0 ? (
          <EventList events={allEvents} />
        ) : (
          <NotFound message='Sorry, no events found.' />
        )}
      </div>
    </div>
  )
}

export default Homepage
