import React, { useState } from 'react'
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
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      dispatch(addCommentToEvent(eventId, fields))
      setSubmitted(true)
      setMessage('Success!')
    } catch (error) {
      setSubmitted(true)
      setMessage('Something went wrong, please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='comment-input'>
      {submitted ? (
        <>
          <p className='comment-input__message'>{message}</p>
          <Button
            type='button'
            text='Dismiss'
            modifier='inline'
            onClick={() => setSubmitted(false)}
          />
        </>
      ) : (
        <>
          <FormInputTextArea
            id='comment'
            label='Add a comment'
            rows={1}
            onChange={handleFields}
            placeholder='Write a comment or ask a question to the creator'
          />
          <Button type='submit' text='Send' modifier='secondary' />
        </>
      )}
    </form>
  )
}

export default EventCommentInput
