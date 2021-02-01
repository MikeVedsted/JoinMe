import React from 'react'

import { ButtonProps } from '../../types'
import './Button.scss'

const Button = ({ type, text, modifier, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={`button button--${modifier}`} {...rest}>
      {text}
    </button>
  )
}

export default Button
