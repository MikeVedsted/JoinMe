import React from 'react'
import Autocomplete from 'react-google-autocomplete'
import axios from 'axios'

import { AddressSelection, AutoCompleteProps } from '../../Types'

const AddressAutoComplete = ({ handleAddress }: AutoCompleteProps) => {
  const MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY

  const extractDetails = async (placeId: string) => {
    const detailsUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${MAPS_KEY}`
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

    components.forEach((value: any) => {
      if (value.types.includes('route')) address.street = value.long_name
      if (value.types.includes('street_number'))
        address.number = value.long_name
      if (value.types.includes('postal_code'))
        address.postal_code = value.long_name
      if (value.types.includes('locality')) address.city = value.long_name
      if (value.types.includes('country')) address.country = value.long_name
    })

    return address
  }

  const handleSelect = async (selection: AddressSelection) => {
    const address = await extractDetails(selection.place_id)
    handleAddress(address)
  }

  return (
    <Autocomplete
      apiKey={MAPS_KEY}
      onPlaceSelected={handleSelect}
      types={['address']}
      componentRestrictions={{ country: 'fi' }}
      className='form__field'
    />
  )
}

export default AddressAutoComplete
