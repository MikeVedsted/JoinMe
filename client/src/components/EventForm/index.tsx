import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import GoogleAutoComplete from '../GoogleAutoComplete'
import InputField from '../FormInputField'
import DropdownField from '../FormDropdownField'
import { useFormFields } from '../../hooks/useFormFields'
import { eventCategories } from '../../util/constants/eventCategories'
import './eventForm.scss'

const EventForm = () => {
  const [cookies, setCookies] = useCookies(['user'])
  const { user_id } = cookies.user
  const [address, setAddress] = useState({})
  const [error, setError] = useState('')
  const [fields, handleFields] = useFormFields({
    title: '',
    category: '',
    date: '',
    time: '',
    description: '',
    maxParticipants: 1,
    created_by: user_id,
    image: '',
    expires_at: ''
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const data = { ...fields, address }
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/events',
        data: data
      })
      alert(
        `Success! Event: ${res.data.title} was created with ID ${res.data.event_id}`
      )
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <InputField
        type='text'
        id='title'
        label='Title'
        onChange={handleFields}
      />
      <DropdownField
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={handleFields}
      />
      <InputField type='date' id='date' label='Date' onChange={handleFields} />
      <InputField type='time' id='time' label='Time' onChange={handleFields} />
      <InputField
        type='date'
        id='expires_at'
        label='Close at'
        onChange={handleFields}
      />
      <GoogleAutoComplete handleAddress={setAddress} />
      <InputField
        type='textarea'
        id='description'
        label='Description'
        onChange={handleFields}
      />
      <InputField
        type='number'
        id='maxParticipants'
        label='Maximum participants'
        onChange={handleFields}
        min={1}
        step={1}
      />
      <InputField type='url' id='image' label='Image' onChange={handleFields} />
      <InputField type='submit' value='Submit' id='submit' label='Submit' />
      {error ? <p>{error}</p> : null}
    </form>
  )
}

export default EventForm
