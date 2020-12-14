import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import axios from 'axios'

import InputField from '../FormInputField'
import { AddressSelection, AutoCompleteProps } from '../../types'

const AddressAutoComplete = ({ handleAddress }: AutoCompleteProps) => {
  const MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY
  const [formattedAddress, setFormattedAddress] = useState('')
  let address = {
    street: '',
    number: '',
    city: '',
    postal_code: '',
    country: '',
    lat: '',
    lng: ''
  }

  const resetSelection = async () => {
    address.street = ''
    address.number = ''
    address.city = ''
    address.postal_code = ''
    address.country = ''
    address.lat = ''
    address.lng = ''
    setFormattedAddress('')
  }

  const extractDetails = async (selection: AddressSelection) => {
    selection.address_components.map((value) => {
      if (value.types.includes('street_number'))
        address.number = value.long_name
      if (value.types.includes('route')) address.street = value.long_name
      if (value.types.includes('locality')) address.city = value.long_name
      if (value.types.includes('country')) address.country = value.long_name
      if (value.types.includes('postal_code'))
        address.postal_code = value.long_name
    })
    setFormattedAddress(selection.formatted_address)
    return address
  }

  const handleSelect = async (selection: AddressSelection) => {
    await resetSelection()
    const basicDetails = await extractDetails(selection)
    const getPlaceDetails = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${selection.place_id}&key=${MAPS_KEY}`
    )
    const { lat, lng } = getPlaceDetails.data.results[0].geometry.location
    address = { ...basicDetails, lat, lng }
    handleAddress(address)
  }

  return (
    <>
      <Autocomplete
        apiKey={MAPS_KEY}
        onPlaceSelected={handleSelect}
        types={['address']}
        componentRestrictions={{ country: 'fi' }}
      />
      <InputField
        label="Address"
        type="text"
        id="address"
        value={formattedAddress}
        modifier="--read-only"
        readOnly
      />
    </>
  )
}

export default AddressAutoComplete
