import React from 'react'

import { ButtonComponent } from '../../types'
import './Button.scss'

const Button = ({ type, text, modifier, ...rest }: ButtonComponent) => {
  return (
    <button type={type} className={`button button--${modifier}`} {...rest}>
      {text}
    </button>
  )
}

export default Button
