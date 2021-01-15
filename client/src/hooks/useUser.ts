import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import { addUser } from '../redux/actions'
import { User } from '../types'

const useUser = (userId: string) => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userId === user_id ? fetchUser() : fetchPublicUser()
  }, [])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/users/${userId}`)
      setUser(data)
      dispatch(addUser(data))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPublicUser = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/users/${userId}/public`)
      setUser(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return [user, loading]
}

export default useUser
