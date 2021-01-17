import React, { useState } from 'react'

import FormDropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import FormSlider from '../FormSlider'
import { eventCategories } from '../../util/constants/eventCategories'
import { EventSearchProps } from '../../types'
import Button from '../Button'
import './EventSearch.scss'

const EventSearch = ({
  distance,
  handleFieldChange,
  handleSubmit,
  setAddress
}: EventSearchProps) => {
  return (
    <div className='search-box'>
      <h2 className='search-box__title'>Search events</h2>
      <FormDropdownField
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={handleFieldChange}
      />
      <label className='form__label'>
        Location
        <GoogleAutoComplete handleAddress={setAddress} />
      </label>
      <label className='form__label'>
        Distance from location
        <FormSlider
          id='distance'
          value={distance}
          onChange={handleFieldChange}
        />
      </label>
      <div className='search-box__button'>
        <Button
          type='submit'
          text='Search'
          modifier='primary'
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default EventSearch
