import React from 'react'

import Button from '../Button'
import FormSlider from '../FormSlider'
import FormDropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import useEventDisplay from '../../hooks/useEventDisplay'
import { eventCategories } from '../../util/constants/eventCategories'
import { EventSearchProps } from '../../Types'

import './EventSearch.scss'

const EventSearch = ({ distance }: EventSearchProps) => {
  const {
    handleFieldChange,
    handleAddressChange,
    handleSearch
  } = useEventDisplay()

  return (
    <div className='search-box'>
      <h3 className='search-box__title'>Search events</h3>
      <FormDropdownField
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={handleFieldChange}
      />
      <label className='form__label'>
        Location
        <GoogleAutoComplete handleAddress={handleAddressChange} />
      </label>
      <label className='form__label'>
        Distance from location
        <FormSlider
          id='distance'
          value={distance}
          onChange={handleFieldChange}
        />
      </label>
      <Button
        type='submit'
        text='Search'
        modifier='primary'
        onClick={handleSearch}
      />
    </div>
  )
}

export default EventSearch
