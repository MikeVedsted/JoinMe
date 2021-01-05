import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventId, Comment } from '../types'

const useEventComments = (eventId: EventId) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState()

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/api/v1/comments/${eventId}`
      })
      const data = response.data
      setComments(data)
    } catch (error) {
      setError(error)
    }
  }
  return [comments, error]
}

export default useEventComments
