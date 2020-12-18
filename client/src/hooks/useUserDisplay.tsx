import { useState, useEffect } from 'react'
import axios from 'axios'

import { User } from '../types'

const useUserDisplay = () => {
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/v1/users'
      })
      const data = response.data
      setUsers(data)
    } catch (error) {
      setError(error.message)
    }
  }
  return [users]
}

export default useUserDisplay
