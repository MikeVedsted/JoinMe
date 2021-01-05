import React from 'react'

import { NotfoundProps } from '../../types'
import notfound from '../../Assets/sorry.jpg'
import './Notfound.scss'

const Notfound = ({ message }: NotfoundProps) => {
  return (
    <div className='notfound'>
      <h1 className='notfound__message'>{message}</h1>
      <img className='notfound__image' src={notfound} alt='not-found' />
    </div>
  )
}

export default Notfound
