import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './util/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/Homepage'
import MyEventsPage from './pages/MyEventsPage'
import ProfileEdit from './pages/ProfileEdit'
import EventEditPage from './pages/EventEditPage'

const Routes = () => (
  <Switch>
    <ProtectedRoute exact path='/' component={HomePage} />
    <ProtectedRoute exact path='/user/:userId' component={ProfilePage} />

    {/* account-setup must be before dynamic path ending! Otherwise it will never match */}
    <ProtectedRoute
      exact
      path='/event/:eventId/edit'
      component={EventEditPage}
    />

    {/* account-setup must be before dynamic path ending! Otherwise it will never match */}
    <ProtectedRoute
      exact
      path='/user/:userId/account-setup'
      component={ProfileEdit}
    />
    <ProtectedRoute exact path='/user/:userId/edit' component={ProfileEdit} />
    <ProtectedRoute
      path='/user/:userId/:contentName'
      component={MyEventsPage}
    />

    <Route exact path='/get-started' component={LandingPage} />

    {/* path '/' without exact prop must be the last route! It will catch everything that doesn't have a match. */}
    <Route path='/' component={LandingPage} />
  </Switch>
)

export default Routes
