import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Event from '../Event'
import EventSearch from '../EventSearch'
import useEventDisplay from '../../hooks/useEventDisplay'
import './Homepage.scss'
import { EventType } from '../../types'

const Homepage = () => {
  const [events] = useEventDisplay()
  const [fullScreen, setFullScreen] = useState<boolean>(
    window.innerWidth > 600 ? true : false
  )
  const [displayFilter, setDisplayFilter] = useState(false)

  const handleAddRequest = () => {
    console.log('requested!!')
  }
  const toggleFilterBox = () => {
    setDisplayFilter(!displayFilter)
  }
  const handleSearch = () => {
    setDisplayFilter(false)
  }

  return (
    <div className='main'>
      <div
        className={
          !fullScreen
            ? 'main__filter-icon'
            : 'main__filter-icon main__filter-icon--hide'
        }
        onClick={toggleFilterBox}
      >
        <FontAwesomeIcon icon={faFilter} />
      </div>
      <div
        className={
          fullScreen
            ? 'main__search-box'
            : 'main__search.box main__search-box--hide'
        }
      >
        <EventSearch handleSearch={handleSearch} />
      </div>
      {/* Filter box for small screens */}
      <div
        className={
          displayFilter
            ? 'main__search-box main__search-box--modal'
            : 'main__search.box main__search-box--hide'
        }
      >
        <EventSearch handleSearch={handleSearch} />
      </div>
      {events ? (
        <div className='main__events'>
          {events.map((event: EventType) => (
            <Event
              key={event.created_at}
              created_at={event.created_at}
              created_by={event.created_by}
              image='https://ichef.bbci.co.uk/news/624/cpsprodpb/1384/production/_111769940_whatsubject.jpg'
              title={event.title}
              date={event.date}
              time={event.time}
              address={event.address}
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
