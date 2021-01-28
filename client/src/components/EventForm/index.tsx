import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button'
import EventImage from '../EventImage'
import FormInputField from '../FormInputField'
import DropdownField from '../FormDropdownField'
import FormInputTextArea from '../FormInputTextArea'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { useFormFields } from '../../hooks/useFormFields'
import { eventCategories } from '../../util/constants/eventCategories'
import { updateEvent, createEvent } from '../../redux/actions'
import { EventFormProps } from '../../Types'
import './EventForm.scss'

const EventForm = ({ event }: EventFormProps) => {
  const dispatch = useDispatch()
  const [address, setAddress] = useState()
  const [fields, handleFields] = useFormFields({
    category: event ? event.category : '',
    title: event ? event.title : '',
    date: event ? event.date.substr(0, 10) : '',
    time: event ? event.time : '',
    description: event ? event.description : '',
    max_participants: event ? event.max_participants : 1,
    image: event ? event.image : '',
    expires_at: event ? event.expires_at.substr(0, 10) : ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submission = { ...fields, address }
    if (event) {
      dispatch(updateEvent(submission, event.event_id))
    } else {
      dispatch(createEvent(submission))
    }
  }
  const {
    title,
    category,
    date,
    time,
    description,
    max_participants,
    image,
    expires_at
  } = fields

  return (
    <form className='event-form' onSubmit={handleSubmit}>
      <h2 className='event-form__title'>
        {event ? 'Update event' : 'Create an event'}
      </h2>
      <DropdownField
        label='Category'
        id='category'
        options={eventCategories}
        onBlur={handleFields}
        required={event ? false : true}
        selectedValue={category}
      />
      <FormInputField
        type='text'
        id='title'
        label='Name'
        value={title}
        onChange={handleFields}
        placeholder='E.g. Friendly outdoor football'
        required={event ? false : true}
      />
      <FormInputField
        type='time'
        id='time'
        label='Time'
        value={time}
        onChange={handleFields}
        required={event ? false : true}
      />
      <FormInputField
        type='date'
        id='date'
        label='Date'
        value={date}
        onChange={handleFields}
        required={event ? false : true}
      />
      <FormInputField
        type='date'
        id='expires_at'
        label='Close requests at'
        value={expires_at}
        onChange={handleFields}
        required={event ? false : true}
      />
      <GoogleAutoComplete
        handleAddress={setAddress}
        required={true}
        label='address'
        currentAddress={
          event &&
          `${event?.street} ${event?.number} ${event?.postal_code} ${event?.city}`
        }
      />
      <FormInputField
        type='number'
        id='max_participants'
        label='Maximum participants'
        value={max_participants}
        onChange={handleFields}
        min={1}
        step={1}
        required={event ? false : true}
      />
      <FormInputTextArea
        id='description'
        label='Event details'
        value={description}
        onChange={handleFields}
        placeholder='Describe your event. Include whatever information might be relevant to know before requesting to join.'
      />
      <div className='event-form__image-upload'>
        <FormInputField
          type='url'
          id='image'
          label='Image'
          value={image}
          onChange={handleFields}
          placeholder='Enter a link for an image you would like to use'
        />
        {image && <EventImage src={image} alt='What we currently display' />}
      </div>
      <div className='event-form__buttons'>
        {!event && <Button type='reset' text='Reset' modifier='secondary' />}
        <Button
          type='submit'
          text={event ? 'Update' : 'Create'}
          modifier='primary'
        />
      </div>
    </form>
  )
}

export default EventForm
