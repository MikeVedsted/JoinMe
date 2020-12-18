import React from 'react'

import { DropdownProps } from '../../types'
import './DropdownField.scss'

const DropdownField = ({
  label,
  id,
  options,
  onBlur,
  ...rest
}: DropdownProps) => {
  return (
    <label className='form__label' {...rest}>
      {label}
      <select onBlur={onBlur} id={id} className='form__field'>
        <option disabled selected hidden className='form__field--option'>
          Select an option
        </option>
        {options.map((optionValue) => (
          <option key={optionValue} className='form__field--option'>
            {optionValue}
          </option>
        ))}
      </select>
    </label>
  )
}

export default DropdownField
