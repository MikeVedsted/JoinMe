import React from 'react'

import Event from '../Event'
import useEventDisplay from '../../hooks/useEventDisplay'
import './Homepage.scss'
import { EventType } from '../../types'

const Homepage = () => {
  const [events] = useEventDisplay()

  const handleAddRequest = () => {
    console.log('requested!!')
  }

  console.log('xxx--', events)
  return (
    <div className='main'>
      {/* <div className='main__searchBox'>
        <h1>search events</h1>
        <h1>search events</h1>
        <h1>search events</h1>
      </div> */}
      {events ? (
        <div className='main__events'>
          {/* {events.map((event: EventType) => ( */}
          <Event
            key='676'
            created_at={events.created_at}
            created_by={'Chiranjibi Chapagain'}
            image='https://ichef.bbci.co.uk/news/624/cpsprodpb/1384/production/_111769940_whatsubject.jpg'
            title={events.title}
            date={events.date}
            time={events.time}
            address={'Markkinatie 15 00700 Helsinki'}
            participants={11}
            max_participants={events.max_participants}
            description={events.description}
            handleAddRequest={handleAddRequest}
          />
          {/* ))} */}
        </div>
      ) : (
        <h1>Sorry! no events found!!</h1>
      )}
    </div>
  )
}

export default Homepage
