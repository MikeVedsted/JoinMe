import React from 'react'

import { CircleContainerProps } from '../../Types'
import './CircleContainer.scss'

const CircleContainer = ({ title, text }: CircleContainerProps) => {
  return (
    <div className='circle'>
      <p className='circle__title'>{title}</p>
      <p className='circle__text'>{text}</p>
    </div>
  )
}

export default CircleContainer
