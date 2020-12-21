import React from 'react'

import { InputTextAreaProps } from '../../types'
import './Textarea.scss'

const Textarea = ({ id, label, modifier, ...rest }: InputTextAreaProps) => {
  return (
    <label className='form__label'>
      {label}
      {rest.required ? (
        <span className='form__label--required'>{'*'}</span>
      ) : (
        ''
      )}
      <textarea
        id={id}
        className={`form__field form__field${modifier}`}
        {...rest}
      />
    </label>
  )
}

export default Textarea
