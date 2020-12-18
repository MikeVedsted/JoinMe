import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Event from '../Event'
import DropDownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import useEventDisplay from '../../hooks/useEventDisplay'
import { eventCategories } from '../../util/constants/eventCategories'
import Button from '../Button'
import './Homepage.scss'
import { EventType } from '../../types'

const Homepage = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(
    window.innerWidth > 1024 ? true : false
  )
  const [displayFilter, setDisplayFilter] = useState(false)
  const [events] = useEventDisplay()

  const handleAddRequest = () => {
    console.log('requested!!')
  }
  const toggleFilterBox = () => {
    setDisplayFilter(!displayFilter)
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
        <DropDownField
          label='Category'
          id='category'
          options={eventCategories}
          onBlur={() => console.log('blurr!!')}
        />
        <GoogleAutoComplete handleAddress={() => console.log('handled!!')} />
        <Button
          type='button'
          text='Search'
          modifier='primary'
          handleClick={() => console.log('button clicked')}
        />
      </div>
      {/* Filter box for small screens */}
      <div
        className={
          displayFilter
            ? 'main__search-box main__search-box--modal'
            : 'main__search.box main__search-box--hide'
        }
      >
        <DropDownField
          label='Category'
          id='category'
          options={eventCategories}
          onBlur={() => console.log('blurr!!')}
        />
        <GoogleAutoComplete handleAddress={() => console.log('handled!!')} />
        <Button
          type='button'
          text='Search'
          modifier='primary'
          handleClick={() => console.log('button clicked')}
        />
      </div>
      {events ? (
        <div className='main__events'>
          {events.map((event: EventType) => (
            <Event
              key='676'
              created_at={event.created_at}
              created_by={'Chiranjibi Chapagain'}
              image='https://ichef.bbci.co.uk/news/624/cpsprodpb/1384/production/_111769940_whatsubject.jpg'
              title={event.title}
              date={event.date}
              time={event.time}
              address={'Markkinatie 15 00700 Helsinki'}
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
