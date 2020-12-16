import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Routes from './Routes'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import GoogleUserLogin from './components/GoogleUserLogin'
import EventForm from './components/EventForm'
import './App.scss'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar />
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
      <br />
      <Link to={'/test-regular'}>Regular route</Link>
      <br />
      <Link to={'/test-protected'}>Auth protected route</Link> */}
      <EventForm />
      {/* <Routes /> */}
    </>
  )
}

export default App
