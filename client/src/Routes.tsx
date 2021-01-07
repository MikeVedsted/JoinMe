import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/Homepage'
import AccountSetup from './pages/AccountSetup'
import MyEventsPage from './pages/MyEventsPage'
import ProfileEdit from './pages/ProfileEdit'

const Routes = () => (
  <Switch>
    <ProtectedRoute exact path='/' component={HomePage} />
    <ProtectedRoute exact path='/user/:userId' component={ProfilePage} />
    <Route exact path='/get-started' component={LandingPage} />
    <ProtectedRoute
      path='/user/:userId/:contentName'
      component={MyEventsPage}
    />
    <ProtectedRoute
      exact
      path='/users/:userId/account-setup'
      component={AccountSetup}
    />
    <ProtectedRoute exact path='/users/:userId/edit' component={ProfileEdit} />
    <Route path='/user/:userId/:contentName' component={MyEventsPage} />
  </Switch>
)

export default Routes
