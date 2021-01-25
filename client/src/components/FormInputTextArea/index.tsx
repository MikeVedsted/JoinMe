import React from 'react'

import { InputTextAreaProps } from '../../Types'
import './Textarea.scss'

const Textarea = ({ id, label, modifier, ...rest }: InputTextAreaProps) => {
  const handleAutoSize = (e: any) => {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div className='textarea'>
      <p className='textarea__label'>
        {rest.required && (
          <span className=' textarea__label textarea__label--required'>
            {'*'}
          </span>
        )}
        {label}
      </p>
      <textarea
        id={id}
        onKeyDown={handleAutoSize}
        className='textarea__field'
        {...rest}
      />
    </div>
  )
}

export default Textarea
