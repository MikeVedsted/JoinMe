import React from 'react'

import { InputFieldProps } from '../../types'
import './InputField.scss'

const InputField = ({
  type,
  id,
  label,
  modifier,
  ...rest
}: InputFieldProps) => {
  return (
    <label className="form__field">
      {label}
      <input
        type={type}
        id={id}
        className={`form__field${modifier}`}
        {...rest}
      />
    </label>
  )
}

export default InputField
