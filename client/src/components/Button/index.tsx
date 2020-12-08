import React from 'react'

import { ButtonComponent } from '../../types'
import './Button.scss'

const Button = ({ type, text, style, handleClick }: ButtonComponent) => {
  return (
    <button onClick={handleClick} type={type} className={`button button--${style}`}>
      {text}
    </button>
  )
}

export default Button