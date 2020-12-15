import React, { useState } from 'react'

import Modal from './components/Modal'
import GoogleUserLogin from './components/GoogleUserLogin'
import Event from './components/Event'
// import EventForm from './components/EventForm'
import './App.scss'

const dummyData = {
  event_id: '1234gfd323434234jfg',
  created_by: 'Chiranjibi Chapagain',
  created_at: '2020-12-14T18:09:11.937Z',
  image:
    'https://d3nfwcxd527z59.cloudfront.net/content/uploads/2019/10/03103831/Lionel-Messi-dribble-Barcelona-Real-Madrid.jpg',
  title: 'Football and Football',
  date: '2020-12-21T22:00:00.000Z',
  time: '03:00:00',
  address: 'Markkinatie 15, 00700 Helsinki',
  participants: 1,
  max_participants: 11,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Event
        event_id={dummyData.event_id}
        created_by={dummyData.created_by}
        created_at={dummyData.created_at}
        image={dummyData.image}
        title={dummyData.title}
        date={dummyData.date}
        time={dummyData.time}
        address={dummyData.address}
        participants={dummyData.participants}
        max_participants={dummyData.max_participants}
        description={dummyData.description}
        handleAddRequest={() => console.log('clicked--')}
      />
      {/* <h1>Moro Moro!</h1>
      <p>Now start developing!</p>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          content={
            <>
              <h3>Log in!</h3>
              <p>Choose your preferred log in method below:</p>
              <GoogleUserLogin />
            </>
          }
        />
      )}
      <button onClick={() => setIsModalOpen(true)}>
        Click here to try out an amazing modal!
      </button>
      <br /> */}
      {/* 
      <h3>Create event form</h3>
      <EventForm /> 
      */}
    </>
  )
}

export default App
