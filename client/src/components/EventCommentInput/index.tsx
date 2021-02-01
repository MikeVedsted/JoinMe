import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import ProfileImage from '../ProfileImage'
import IconButton from '../IconButton'
import FormInputTextArea from '../FormInputTextArea'
import { useFormFields } from '../../hooks/useFormFields'
import { addCommentToEvent } from '../../redux/actions/event'
import { EventCommentInputProps, AppState } from '../../Types'
import './EventCommentInput.scss'

const EventCommentInput = ({ eventId }: EventCommentInputProps) => {
  const dispatch = useDispatch()
  const { profile_image, first_name } = useSelector(
    (state: AppState) => state.user
  )
  const [fields, handleFields] = useFormFields({ comment: '' })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(addCommentToEvent(eventId, fields))
  }

  return (
    <form onSubmit={handleSubmit} className='comment-input'>
      <ProfileImage image={profile_image} alt={first_name} />
      <FormInputTextArea
        id='comment'
        label=''
        rows={1}
        onChange={handleFields}
        placeholder='Write a comment or ask a question to the creator'
      />
      <IconButton
        type='submit'
        icon={faPaperPlane}
        modifier='secondary'
        size='lg'
      />
    </form>
  )
}

export default EventCommentInput
