import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Loading.scss'

const Loading = () => {
  return (
    <div className='loading'>
      <FontAwesomeIcon icon='basketball-ball' className='loading__basket' />
      <FontAwesomeIcon icon='futbol' className='loading__futbol' />
      <FontAwesomeIcon icon='volleyball-ball' className='loading__volley' />
      <h3 className='loading__text'>Loading</h3>
    </div>
  )
}

export default Loading
