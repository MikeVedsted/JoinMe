import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import EventComment from '../EventComment'
import EventCommentInput from '../EventCommentInput'
import { getEventComments } from '../../redux/actions'
import { AppState, CommentSectionProps } from '../../Types'
import './EventCommentSection.scss'

const EventCommentSection = ({ eventId }: CommentSectionProps) => {
  const dispatch = useDispatch()
  const { allEvents } = useSelector((state: AppState) => state.event)
  const currentEvent = allEvents.findIndex(
    (event) => event.event_id === eventId
  )
  const { comments } = useSelector(
    (state: AppState) => state.event.allEvents[currentEvent]
  )

  useEffect(() => {
    comments === undefined && dispatch(getEventComments(eventId))
  }, [eventId, dispatch, comments])

  return (
    <div className='comment-section'>
      <h3 className='comment-section__title'>Comments</h3>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <EventComment
            key={comment.commented_at}
            image={comment.profile_image}
            name={comment.first_name}
            text={comment.comment}
            date={comment.commented_at}
            id={comment.user_id}
          />
        ))
      ) : (
        <p className='comment-section__placeholder'>
          No comments yet. Have a question? Add it below!
        </p>
      )}
      <EventCommentInput eventId={eventId} />
    </div>
  )
}

export default EventCommentSection
