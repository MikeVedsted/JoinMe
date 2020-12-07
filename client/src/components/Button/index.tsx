import React from 'react'

import { ButtonComponent } from '../../types'
import './Button.scss'

// For Type pass in "button" | "submit" | "reset"; for text pass in the text you want in buttton;
// for style pass in "primary" | "secondary" | "default"; for handleClick pass in the function name.

const Button = ({ type, text, style, handleClick }: ButtonComponent) => {
  return (
    <button onClick={handleClick} type={type} className={style}>
      {text}
    </button>
  )
}

export default Button
