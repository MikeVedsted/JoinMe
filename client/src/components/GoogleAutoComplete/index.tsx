import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'

import { AddressComponents, AddressComponent } from '../../types'

const AddressAutoComplete = () => {
  const MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const handleSelect = (address: AddressComponents) => {
    address.address_components.map((value: AddressComponent) => {
      if (value.types.includes('street_number')) setNumber(value.long_name)
      if (value.types.includes('route')) setStreet(value.long_name)
      if (value.types.includes('locality')) setCity(value.long_name)
      if (value.types.includes('country')) setCountry(value.long_name)
      if (value.types.includes('postal_code')) setPostalCode(value.long_name)
    })
  }

  return (
    <>
      <Autocomplete
        apiKey={MAPS_KEY}
        onPlaceSelected={handleSelect}
        types={['address']}
        componentRestrictions={{ country: 'fi' }}
      />
      <label className="form__field--readOnly">
        Street:
        <input type="text" id="street" value={street} readOnly />
      </label>
      <label className="form__field--readOnly">
        Number:
        <input type="text" id="number" value={number} readOnly />
      </label>
      <label className="form__field--readOnly">
        Postal code:
        <input type="text" id="postalCode" value={postalCode} readOnly />
      </label>
      <label className="form__field--readOnly">
        City:
        <input type="text" id="city" value={city} readOnly />
      </label>
      <label className="form__field--readOnly">
        Country:
        <input type="text" id="country" value={country} readOnly />
      </label>
    </>
  )
}

export default AddressAutoComplete
