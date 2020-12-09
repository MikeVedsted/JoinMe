import React from 'react'

import GoogleUserLogin from './components/GoogleUserLogin'
import GoogleAutoComplete from './components/GoogleAutoComplete'
import './App.scss'

const App = () => {
  return (
    <>
      <h1>Moro Moro!</h1>
      <p>Now start developing!</p>
      <GoogleUserLogin />
      <br />
      <GoogleAutoComplete />
    </>
  )
}

export default App
