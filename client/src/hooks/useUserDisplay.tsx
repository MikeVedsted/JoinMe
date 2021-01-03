import { useState, useEffect } from 'react'
import axios from 'axios'

import { UserType } from '../types'

const useUserDisplay = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
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
