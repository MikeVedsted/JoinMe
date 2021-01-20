import { combineReducers } from 'redux'

import user from './user'
import event from './event'
// import auth from './auth'
// import error from './error'

const createRootReducer = () =>
  combineReducers({
    user,
    event
    // auth,
    // error,
  })

export default createRootReducer
