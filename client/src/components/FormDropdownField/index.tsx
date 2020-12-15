import React from 'react'

import { DropdownProps } from '../../types'
import './DropdownField.scss'

const DropdownField = ({ label, id, options, onBlur }: DropdownProps) => {
  return (
    <label className='form__field'>
      {label}
      <select onBlur={onBlur} id={id}>
        {options.map((optionValue) => (
          <option key={optionValue}>{optionValue}</option>
        ))}
      </select>
    </label>
  )
}

export default DropdownField
