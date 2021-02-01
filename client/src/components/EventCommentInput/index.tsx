import React from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button'
import FormInputTextArea from '../FormInputTextArea'
import { useFormFields } from '../../hooks/useFormFields'
import { addCommentToEvent } from '../../redux/actions/event'
import { EventCommentInputProps } from '../../Types'
import './EventCommentInput.scss'

const EventCommentInput = ({ eventId }: EventCommentInputProps) => {
  const dispatch = useDispatch()
  const [fields, handleFields] = useFormFields({ comment: '' })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(addCommentToEvent(eventId, fields))
  }

  return (
    <form onSubmit={handleSubmit} className='comment-input'>
      <FormInputTextArea
        id='comment'
        label='Add a comment'
        rows={1}
        onChange={handleFields}
        placeholder='Write a comment or ask a question to the creator'
      />
      <Button type='submit' text='Send' modifier='secondary' />
    </form>
  )
}

export default EventCommentInput
