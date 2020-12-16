import React, { useState, useEffect, useRef } from 'react'

import { FormSliderProps } from '../../types'
import './FormSlider.scss'

const FormSlider = ({
  labelText,
  minRange = 0,
  maxRange = 100,
  steps = 5,
  defaultValue = 20
}: FormSliderProps) => {
  const [distance, setDistance] = useState(defaultValue)
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (componentRef.current) {
      const width = componentRef.current.offsetWidth
      componentRef.current.style.left = `calc(${distance} * (${
        width / maxRange
      }px))`
    }
  })

  return (
    <div className='form__slider'>
      <label className='form__slider--label' htmlFor='slider'>
        {labelText}
      </label>

      <div ref={componentRef} className='form__slider--value-container'>
        <p className='form__slider--value'>{distance}</p>
      </div>

      <input
        type='range'
        min={minRange}
        max={maxRange}
        step={steps}
        id='slider'
        value={distance}
        className='form__slider--range'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDistance(e.target.valueAsNumber)
        }
      />

      <div className='form__slider--subtitle-container'>
        <p className='form__slider--subtitle'>{minRange} km</p>
        <p className='form__slider--subtitle'>{maxRange} km</p>
      </div>
    </div>
  )
}

export default FormSlider
