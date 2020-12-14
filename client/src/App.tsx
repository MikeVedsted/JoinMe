import React, { useState } from 'react'

import Modal from './components/Modal'
import GoogleUserLogin from './components/GoogleUserLogin'
import EventForm from './components/EventForm'
import './App.scss'

const App = () => {
  const [closeModal, setCloseModal] = useState(false)

  return (
    <>
      <h1>Moro Moro!</h1>
      <p>Now start developing!</p>
      {closeModal && (
        <Modal
          closeModal={() => setCloseModal(false)}
          component={<GoogleUserLogin />}
        />
      )}
      <button onClick={() => setCloseModal(true)}>
        Click here to try out an amazing modal!
      </button>
      <br />
      <h3>Create event form</h3>
      <EventForm />
    </>
  )
}

export default App
