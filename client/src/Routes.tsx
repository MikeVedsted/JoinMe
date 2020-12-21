import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AccountSetup from './pages/AccountSetup'
// import ProfilePage from './pages/ProfilePage'
// import MyEventsPage from './pages/MyEventsPage'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    {/* <Route exact path='/user/:userId' component={ProfilePage} /> */}
    {/* <Route path='/user/:userId/:contentName' component={MyEventsPage} /> */}
    <Route path='/:userId/account-setup' component={AccountSetup} />
  </Switch>
)

export default Routes
