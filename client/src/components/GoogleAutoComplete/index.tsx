import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Autocomplete from 'react-google-autocomplete'

import { setErrors } from '../../redux/actions'
import {
  AutoCompleteProps,
  AddressSelection,
  AddressComponent
} from '../../Types'

const AddressAutoComplete = ({
  handleAddress,
  label,
  required,
  currentAddress
}: AutoCompleteProps) => {
  const MAPS_API_KEY =
    (process.env.GOOGLE_MAPS_KEY as string) ||
    (process.env.REACT_APP_GOOGLE_MAPS_KEY as string)

  const dispatch = useDispatch()

  const extractDetails = async (placeId: string) => {
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${MAPS_API_KEY}`
      const { data } = await axios.get(detailsUrl)
      const { lat, lng } = data.results[0].geometry.location
      const components = data.results[0].address_components
      let address = {
        street: '',
        number: '',
        city: '',
        postal_code: '',
        country: '',
        lat,
        lng
      }

      components.forEach((value: AddressComponent) => {
        if (value.types.includes('route')) address.street = value.long_name
        if (value.types.includes('street_number'))
          address.number = value.long_name
        if (value.types.includes('postal_code'))
          address.postal_code = value.long_name
        if (value.types.includes('locality')) address.city = value.long_name
        if (value.types.includes('country')) address.country = value.long_name
      })
      return address
    } catch (error) {
      dispatch(setErrors('400', 'Error extracting address'))
    }
  }

  const handleSelect = async (selection: AddressSelection) => {
    try {
      const address = await extractDetails(selection.place_id)
      handleAddress(address)
    } catch (error) {
      dispatch(setErrors('400', 'Error extracting address'))
    }
  }

  return (
    <label className='form__label'>
      {label}
      {required && <span className='form__label--required'>{'*'}</span>}
      {currentAddress && (
        <p className='form__address-display'>
          Current address: {currentAddress}
        </p>
      )}
      <Autocomplete
        apiKey={MAPS_API_KEY}
        onPlaceSelected={handleSelect}
        types={['address']}
        componentRestrictions={{ country: 'fi' }}
        className='form__field'
      />
    </label>
  )
}

export default AddressAutoComplete
