import React from 'react'

import GoogleUserLogin from './components/GoogleUserLogin'
import GoogleAutoComplete from './components/GoogleAutoComplete'
import EventForm from './components/EventForm'
import './App.scss'

const App = () => {
  return (
    <>
      <h1>Moro Moro!</h1>
      <p>Now start developing!</p>
      <GoogleUserLogin />
      <br />
      <h3>Create event form</h3>
      <EventForm />
    </>
  )
}

export default App
