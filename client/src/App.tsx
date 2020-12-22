import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBell,
  faComment,
  faUserShield,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons'

import Routes from './Routes'
import Navbar from './components/Navbar'
// import Modal from './components/Modal'
// import GoogleUserLogin from './components/GoogleUserLogin'
// import EventForm from './components/EventForm'
// import Routes from './Routes'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import MyEventsSidebar from './components/MyEventsSidebar'
import './App.scss'

library.add(
  fab,
  faBell,
  faComment,
  faUserShield,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUser
)

const App = () => {
  return (
    <>
      <Navbar />
      {/* <LandingPage /> */}
      {/* <div style={{ padding: '40px' }}>
        <MyEventsSidebar />
      </div> */}
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
      </button> */}
      {/* <br />
      <Link to={'/test-regular'}>Regular route</Link>
      <br />
      <Link to={'/test-protected'}>Auth protected route</Link> */}
      {/* <h3>Create event form</h3>
      <EventForm />*/}
      <Routes />
      <Footer />
    </>
  )
}

export default App
