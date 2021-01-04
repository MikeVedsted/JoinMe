import React, { useState, useEffect } from 'react'

import { FormSliderProps } from '../../types'
import './FormSlider.scss'

const FormSlider = ({
  minRange = 0,
  maxRange = 100,
  steps = 5,
  initialValue = 20,
  id,
  value,
  onChange
}: FormSliderProps) => {
  const [relativeValue, setRelativeValue] = useState(initialValue)
  const [thumbPosition, setThumbPosition] = useState('')

  useEffect(() => {
    setRelativeValue(((Number(value) - minRange) * 100) / (maxRange - minRange))
    const newPosition = `calc(${relativeValue}% + (${
      8 - relativeValue * 0.15
    }px))`
    setThumbPosition(newPosition)
  }, [value, maxRange, minRange, relativeValue])

  return (
    <div className='slider'>
      <output style={{ left: `${thumbPosition}` }} className='slider__value'>
        {value}
      </output>
      <input
        type='range'
        min={minRange}
        max={maxRange}
        id={id}
        step={steps}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            #e03600 0%,
            #e03600 ${relativeValue}%,
            #f28705 ${relativeValue + 1}%,
            #f28705 100%
          )`
        }}
        value={value}
        className='slider__range'
        onChange={onChange}
      />
      <div className='slider__subset-labels'>
        <p className='slider__subset-labels--text'>{minRange} km</p>
        <p className='slider__subset-labels--text'>{maxRange} km</p>
      </div>
    </div>
  )
}

export default FormSlider
