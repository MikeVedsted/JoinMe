import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Button from '../Button'
import InputField from '../FormInputField'
import DropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { useFormFields } from '../../hooks/useFormFields'
import { eventCategories } from '../../util/constants/eventCategories'
import './EventUpdateForm.scss'

const EventUpdateForm = ({ data, eventId }: any) => {
  const history = useHistory()
  const [address, setAddress] = useState({})
  const [error, setError] = useState('')

  const convertDate = (date: any) => {
    const convertedDate = date.substr(0, 10)
    return convertedDate
  }
  const date = convertDate(data.date) || ''
  const expires_at = convertDate(data.expires_at) || ''

  const [fields, handleFields] = useFormFields({
    title: data.title || '',
    category: data.category || '',
    date: date,
    time: data.time || '',
    description: data.description || '',
    max_participants: data.max_participants || '',
    image: data.image || '',
    expires_at: expires_at
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const data = { ...fields, address }
      await axios({
        method: 'PUT',
        url: `/api/v1/events/${eventId}`,
        data: data
      })
      setError('')
      history.push('/')
      alert(`Success! Event: ${data.event_id} was successfully updated`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Update an event</h2>
      <DropdownField
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={handleFields}
        required={true}
        selectedValue={fields.category}
      />
      <InputField
        type='text'
        id='title'
        label='Name'
        value={fields.title}
        onChange={handleFields}
        placeholder='E.g. Friendly outdoor football'
        required={true}
      />
      <InputField
        type='time'
        id='time'
        label='Time'
        value={fields.time}
        onChange={handleFields}
        required={true}
      />
      <InputField
        type='date'
        id='date'
        label='Date'
        value={fields.date}
        onChange={handleFields}
        required={true}
      />
      <InputField
        type='date'
        id='expires_at'
        label='Close requests at'
        value={fields.expires_at}
        onChange={handleFields}
        required={true}
      />
      <label className='form__label'>
        Address
        <p className='form__label form__label--address'>
          {`Current address: ${data.street} ${data.number} ${data.postal_code} ${data.city}. Type in to change new address.`}
        </p>
        <GoogleAutoComplete handleAddress={setAddress} />
      </label>
      <InputField
        type='number'
        id='maxParticipants'
        label='Maximum participants'
        value={fields.max_participants}
        onChange={handleFields}
        min={1}
        step={1}
        required={true}
      />
      <InputField
        type='text'
        id='description'
        label='Event details'
        value={fields.description}
        onChange={handleFields}
        placeholder='Describe your event. Include whatever information might be relevant to know before requesting to join.'
      />
      <InputField
        type='url'
        id='image'
        label='Image'
        value={fields.image}
        onChange={handleFields}
        placeholder='Enter a link for an image you would like to use'
      />
      <div className='form-buttons'>
        <Button type='reset' text='Reset' modifier='secondary' />
        <Button type='submit' text='Update' modifier='primary' />
      </div>
      {error && <p>{error}</p>}
    </form>
  )
}

export default EventUpdateForm
