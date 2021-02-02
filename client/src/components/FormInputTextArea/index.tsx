import React from 'react'

import { InputTextAreaProps } from '../../Types'

const Textarea = ({ id, label, modifier, ...rest }: InputTextAreaProps) => {
  const handleAutoSize = (e: any) => {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <label className='form__label'>
      {label}
      {rest.required && <span className='form__label--required'>{'*'}</span>}
      <textarea
        id={id}
        onKeyDown={handleAutoSize}
        className='form__field--text-area'
        {...rest}
      />
    </label>
  )
}

export default Textarea
