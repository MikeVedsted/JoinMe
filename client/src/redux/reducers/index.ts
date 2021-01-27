import { combineReducers } from 'redux'

import loading from './loading'
import event from './event'
import error from './error'
import user from './user'
import auth from './auth'
import ui from './ui'
import participants from './participants'

const createRootReducer = () =>
  combineReducers({
    loading,
    event,
    error,
    user,
    auth,
    ui,
    participants
  })

export default createRootReducer
