import React from 'react'

import { NotFoundProps } from '../../types'
import notfound from '../../Assets/sorry.jpg'
import './NotFound.scss'

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div className='not-found'>
      <h1 className='not-found__message'>{message}</h1>
      <img className='not-found__image' src={notfound} alt='not-found' />
    </div>
  )
}

export default NotFound
