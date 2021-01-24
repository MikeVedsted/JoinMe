import { combineReducers } from 'redux'

import event from './event'
import user from './user'
import auth from './auth'
import ui from './ui'
// import error from './error'

const createRootReducer = () =>
  combineReducers({
    event,
    user,
    auth,
    ui
    // error,
  })

export default createRootReducer
