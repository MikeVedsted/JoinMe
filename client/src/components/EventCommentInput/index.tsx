import React from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Button from '../Button'
import FormInputTextArea from '../FormInputTextArea'
import { useFormFields } from '../../hooks/useFormFields'
import { EventCommentInputProps } from '../../types'
import './EventCommentInput.scss'

const EventCommentInput = ({ eventId }: EventCommentInputProps) => {
  const [cookies] = useCookies(['user'])
  const [fields, handleFields] = useFormFields({ comment: '' })
  const { user_id } = cookies.user

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const data = { comment: fields.comment, userId: user_id }
      await axios.post(`/api/v1/comments/${eventId}`, data)
    } catch (error) {
      console.log(error)
    }
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
      <Button type='submit' text='Send' modifier='inline' />
    </form>
  )
}

export default EventCommentInput
