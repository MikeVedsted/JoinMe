import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import ProtectedRoute from './util/ProtectedRoute'
// import AdminRoute from './util/AdminRoute'
import LandingPage from './pages/LandingPage'
// import ProfilePage from './pages/ProfilePage'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    {/* <Route exact path='/:userId' component={ProfilePage} /> */}
    {/* 
    <ProtectedRoute exact path="/cart" component={Cart} />
    <AdminRoute exact path="/admin/create-product" component={CreateProduct} />
    <AdminRoute path="/admin/manage-product/:id" children={<ManageProduct />} /> 
    */}
  </Switch>
)

export default Routes
