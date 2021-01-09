import { combineReducers } from 'redux'

import user from './user'
// import auth from './auth'
// import error from './error'

const createRootReducer = () =>
  combineReducers({
    user
    // auth,
    // error,
  })

export default createRootReducer
