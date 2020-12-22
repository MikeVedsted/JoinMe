import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Button from '../Button'
import InputField from '../FormInputField'
import DropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { useFormFields } from '../../hooks/useFormFields'
import { eventCategories } from '../../util/constants/eventCategories'
import './EventForm.scss'

const EventForm = () => {
  const [cookies, setCookies] = useCookies(['user'])
  let user_id = undefined
  if (cookies.user) user_id = cookies.user.user_id
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
        url: '/api/v1/events',
        data: data
      })
      setError('')
      alert(
        `Success! Event: ${res.data.title} was created with ID ${res.data.event_id}`
      )
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Create an event</h2>
      <DropdownField
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={handleFields}
        required={true}
      />
      <InputField
        type='text'
        id='title'
        label='Name'
        onChange={handleFields}
        placeholder='E.g. Friendly outdoor football'
        required={true}
      />
      <InputField
        type='time'
        id='time'
        label='Time'
        onChange={handleFields}
        required={true}
      />
      <InputField
        type='date'
        id='date'
        label='Date'
        onChange={handleFields}
        required={true}
      />
      <InputField
        type='date'
        id='expires_at'
        label='Close requests at'
        onChange={handleFields}
        required={true}
      />
      <label className='form__label'>
        Address
        <GoogleAutoComplete handleAddress={setAddress} />
      </label>
      <InputField
        type='number'
        id='maxParticipants'
        label='Maximum participants'
        onChange={handleFields}
        min={1}
        step={1}
        required={true}
      />
      <InputField
        type='text'
        id='description'
        label='Event details'
        onChange={handleFields}
        placeholder='Describe your event. Include whatever information might be relevant to know before requesting to join.'
      />
      <InputField
        type='url'
        id='image'
        label='Image'
        onChange={handleFields}
        placeholder='Enter a link for an image you would like to use'
      />
      <div className='form-buttons'>
        <Button type='reset' text='Reset' modifier='secondary' />
        <Button type='submit' text='Create' modifier='primary' />
      </div>
      {error && <p>{error}</p>}
    </form>
  )
}

export default EventForm
