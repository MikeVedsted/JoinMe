import React from 'react'

import { DropdownProps } from '../../types'
import './DropdownField.scss'

const DropdownField = ({
  label,
  id,
  options,
  onBlur,
  selectedValue,
  ...rest
}: DropdownProps) => {
  return (
    <label className='form__label' {...rest}>
      {label}
      <select
        onChange={onBlur}
        id={id}
        className='form__field'
        value={selectedValue}
        defaultValue='Select an option'
      >
        <option disabled hidden className='form__field--option'>
          {selectedValue ? selectedValue : 'Select an option'}
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
