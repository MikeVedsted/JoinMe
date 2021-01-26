import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import App from './App'
import makeStore from './redux/store'
import './util/fontawesome'
import './index.scss'

const store = makeStore()

const WithProvider = () => (
  <Provider store={store}>
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <WithProvider />
  </React.StrictMode>,
  document.getElementById('root')
)
