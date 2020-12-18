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
  const [relativeValue, setRelativeValue] = useState(initialValue)
  const [thumbPosition, setThumbPosition] = useState('')

  useEffect(() => {
    const relativeValue = ((value - minRange) * 100) / (maxRange - minRange)
    setRelativeValue(relativeValue)
    const newPosition = `calc(${relativeValue}% + (${
      8 - relativeValue * 0.15
    }px))`
    setThumbPosition(newPosition)
  }, [value, maxRange, minRange])

  return (
    <div className='slider'>
      <output style={{ left: `${thumbPosition}` }} className='slider__value'>
        {value}
      </output>
      <input
        type='range'
        min={minRange}
        max={maxRange}
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
