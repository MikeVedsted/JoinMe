import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AccountSetup from './pages/AccountSetup'
import MyEventsPage from './pages/MyEventsPage'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    {/* <Route exact path='/user/:userId' component={ProfilePage} /> */}
    <Route exact path='/user/:userId/account-setup' component={AccountSetup} />
    <Route path='/user/:userId/:contentName' component={MyEventsPage} />
  </Switch>
)

export default Routes
