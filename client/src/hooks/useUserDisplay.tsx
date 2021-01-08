import { useState, useEffect } from 'react'
import axios from 'axios'

import { UserType } from '../types'

const useUserDisplay = () => {
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/users')
      const data = response.data
      setUsers(data)
    } catch (error) {
      throw error
    }
  }
  return [users]
}

export default useUserDisplay
