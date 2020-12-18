import React, { useState, useEffect } from 'react'

import { FormSliderProps } from '../../types'
import './FormSlider.scss'

const FormSlider = ({
  minRange = 0,
  maxRange = 100,
  steps = 5,
  initialValue = 20
}: FormSliderProps) => {
  const [value, setValue] = useState(initialValue)
  const [leftPosition, setLeftPosition] = useState('')

  useEffect(() => {
    const newValue = ((value - minRange) * 100) / (maxRange - minRange)
    const newPosition = `calc(${newValue}% + (${8 - newValue * 0.15}px))`
    setLeftPosition(newPosition)
  }, [value, maxRange, minRange])

  return (
    <div className='slider'>
      <output style={{ left: `${leftPosition}` }} className='slider__value'>
        {value}
      </output>
      <input
        type='range'
        min={minRange}
        max={maxRange}
        step={steps}
        value={value}
        className='slider__range'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.valueAsNumber)
        }
      />
      <div className='slider__subset-labels'>
        <p className='slider__subset-labels--text'>{minRange} km</p>
        <p className='slider__subset-labels--text'>{maxRange} km</p>
      </div>
    </div>
  )
}

export default FormSlider
