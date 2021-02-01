import React, { useState, useEffect, ChangeEvent } from 'react'

import { FormSliderProps } from '../../Types'
import './FormSlider.scss'

const FormSlider = ({
  minRange = 0,
  maxRange = 100,
  steps = 5,
  initialValue = 20,
  id,
  value,
  onChange,
  label
}: FormSliderProps) => {
  const [relativeValue, setRelativeValue] = useState(initialValue)
  const [thumbPosition, setThumbPosition] = useState('')

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRelativeValue(parseInt(e.target.value))
    onChange(e)
  }

  useEffect(() => {
    setRelativeValue(
      ((Number(relativeValue) - minRange) * 100) / (maxRange - minRange)
    )
    const newPosition = `calc(${relativeValue}% + (${
      8 - relativeValue * 0.15
    }px))`
    setThumbPosition(newPosition)
  }, [value, maxRange, minRange, relativeValue])

  return (
    <label className='form__label slider'>
      {label}
      <output style={{ left: `${thumbPosition}` }} className='slider__value'>
        {relativeValue}
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
        value={relativeValue}
        className='slider__range'
        onChange={handleSliderChange}
      />
      <div className='slider__subset-labels'>
        <p className='slider__subset-labels--text'>{minRange} km</p>
        <p className='slider__subset-labels--text'>{maxRange} km</p>
      </div>
    </label>
  )
}

export default FormSlider
