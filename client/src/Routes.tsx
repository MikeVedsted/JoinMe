import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import MyEventsPage from './pages/MyEventsPage'

const RegularComponent = () => {
  return <h1>regular component 1</h1>
}

const ProtectedComponent = () => {
  return <h1>protected component</h1>
}

const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/test-regular' component={RegularComponent} />
    <ProtectedRoute
      exact
      path='/test-protected'
      component={ProtectedComponent}
    />
    <Route exact path='/user/:userId' component={ProfilePage} />
    <Route path='/user/:userId/:contentName' component={MyEventsPage} />
  </Switch>
)

export default Routes
