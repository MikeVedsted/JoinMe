import React, { useState } from 'react'

import Modal from './components/Modal'
import GoogleUserLogin from './components/GoogleUserLogin'
import EventForm from './components/EventForm'
import './App.scss'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <h1>Moro Moro!</h1>
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
      <br />
      <h3>Create event form</h3>
      <EventForm />
    </>
  )
}

export default App
