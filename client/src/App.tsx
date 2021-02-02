import React from 'react'

import Routes from './Routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.scss'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes />
      <Footer />
    </>
  )
}

export default App
