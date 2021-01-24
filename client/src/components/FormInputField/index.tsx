import React from 'react'

import { InputFieldProps } from '../../Types'
import './InputField.scss'

const InputField = ({
  type,
  id,
  label,
  modifier,
  ...rest
}: InputFieldProps) => {
  return (
    <label className='form__label'>
      {label}
      {rest.required && <span className='form__label--required'>{'*'}</span>}
      <input
        type={type}
        id={id}
        className={`form__field form__field${modifier}`}
        {...rest}
      />
    </label>
  )
}

export default InputField
