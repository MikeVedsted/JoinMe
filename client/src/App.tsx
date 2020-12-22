import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBell,
  faComment,
  faUserShield,
  faCalendar,
  faTimes,
  faClock,
  faMapMarkerAlt,
  faListUl,
  faUser,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import Routes from './Routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.scss'

library.add(
  fab,
  faBell,
  faComment,
  faUserShield,
  faCalendar,
  faTimes,
  faClock,
  faMapMarkerAlt,
  faListUl,
  faUser,
  faSignOutAlt
)

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
