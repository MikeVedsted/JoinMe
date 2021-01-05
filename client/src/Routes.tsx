import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/Homepage'
import AccountSetup from './pages/AccountSetup'
import MyEventsPage from './pages/MyEventsPage'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/user/:userId' component={ProfilePage} />
    <Route exact path='/get-started' component={LandingPage} />
    <ProtectedRoute
      path='/user/:userId/:contentName'
      component={MyEventsPage}
    />
    <Route exact path='/user/:userId/account-setup' component={AccountSetup} />
    <Route path='/user/:userId/:contentName' component={MyEventsPage} />
  </Switch>
)

export default Routes
