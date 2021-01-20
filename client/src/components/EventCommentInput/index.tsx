import React, { useState } from 'react'
import axios from 'axios'

import Button from '../Button'
import FormInputTextArea from '../FormInputTextArea'
import { useFormFields } from '../../hooks/useFormFields'
import { EventCommentInputProps } from '../../types'
import './EventCommentInput.scss'

// TODO:
// Add dispatch for sending comment once ready
// Add dispatch for setting message once ready
// Add success message once ready
// Prevent button from going off screen
// IMPROVEMENTS
// Auto-expand textarea to content

const EventCommentInput = ({ eventId }: EventCommentInputProps) => {
  const [fields, handleFields] = useFormFields({ comment: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await axios.post(`/api/v1/comments/${eventId}`, fields)
      setSubmitted(true)
    } catch (error) {
      console.log(error)
    }
  }

  const dismiss = (event: MouseEvent) => {
    event.preventDefault()
    setSubmitted(false)
  }

  return (
    <>
      {submitted ? (
        <>
          <p>Success!</p>
          <Button
            type='button'
            text='Dismiss'
            modifier='inline'
            onClick={dismiss}
          />
        </>
      ) : (
        <form onSubmit={handleSubmit} className='comment-input'>
          <FormInputTextArea
            id='comment'
            label='Add a comment'
            rows={1}
            onChange={handleFields}
            placeholder='Write a comment or ask a question to the creator'
          />
          <Button type='submit' text='Send' modifier='inline' />
        </form>
      )}
    </>
  )
}

export default EventCommentInput
