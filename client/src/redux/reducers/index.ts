import { combineReducers } from 'redux'

import loading from './loading'
import event from './event'
import error from './error'
import user from './user'
import auth from './auth'
import ui from './ui'

const createRootReducer = () =>
  combineReducers({
    loading,
    event,
    error,
    user,
    auth,
    ui
  })

export default createRootReducer
