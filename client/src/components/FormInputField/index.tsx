import React from 'react'

import { InputFieldProps } from '../../Types'

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
      <input type={type} id={id} className='form__field' {...rest} />
    </label>
  )
}

export default InputField
