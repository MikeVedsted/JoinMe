import { createStore, applyMiddleware, compose } from 'redux'

import createRootReducer from './reducers'

const initState = {}

export default function makeStore(initialState = initState) {
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const localStorageState = localStorage.getItem('all-hats')
  if (localStorageState) {
    initialState = JSON.parse(localStorageState)
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware())
  )

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
