import React from 'react'

import EventComment from '../EventComment'
import EventCommentInput from '../EventCommentInput'
import useEventComments from '../../hooks/useEventComments'
import { CommentSectionProps } from '../../types'

const EventCommentSection = ({ eventId }: CommentSectionProps) => {
  const [comments] = useEventComments(eventId)

  return (
    <div className='comment-section'>
      <h3 className='comment-section__title'>Comments</h3>
      {comments &&
        comments.map((comment) => (
          <EventComment
            key={comment.date}
            image={comment.profile_image}
            name={comment.first_name}
            text={comment.comment}
            date={comment.commented_at}
            id={comment.user_id}
          />
        ))}
      <EventCommentInput eventId={eventId} />
    </div>
  )
}

export default EventCommentSection
