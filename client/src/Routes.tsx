import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
// import HomePage from './pages/HomePage'
// import ProfilePage from './pages/ProfilePage'
import MyEventsPage from './pages/MyEventsPage'

const Routes = () => (
  <Switch>
    <ProtectedRoute exact path='/home' component={<p>home page here</p>} />
    {/* <Route exact path='/user/:userId' component={ProfilePage} /> */}
    <ProtectedRoute
      path='/user/:userId/:contentName'
      component={MyEventsPage}
    />
    <Route path='/' component={LandingPage} />
  </Switch>
)

export default Routes
