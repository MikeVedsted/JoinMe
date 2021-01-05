import React from 'react'

import EventComment from '../EventComment'
import useEventComments from '../../hooks/useEventComments'
import { CommentSectionProps } from '../../types'

const EventCommentSection = ({ eventId }: CommentSectionProps) => {
  const [comments, error] = useEventComments(eventId)
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <EventComment
            key={comment.date}
            image={comment.profile_image}
            user={comment.first_name}
            text={comment.comment}
            date={comment.commented_at}
          />
        ))}
    </>
  )
}

export default EventCommentSection
