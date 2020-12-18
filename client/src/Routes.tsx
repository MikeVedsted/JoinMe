import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
// import ProfilePage from './pages/ProfilePage'

const RegularComponent = () => {
  return <h1>regular component 1</h1>
}

const ProtectedComponent = () => {
  return <h1>protected component</h1>
}

const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    {/* <Route exact path='/:userId' component={ProfilePage} /> */}
    <Route exact path='/test-regular' component={RegularComponent} />
    <ProtectedRoute
      exact
      path='/test-protected'
      component={ProtectedComponent}
    />
  </Switch>
)

export default Routes
