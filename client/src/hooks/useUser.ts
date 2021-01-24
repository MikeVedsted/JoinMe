import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import { setUser } from '../redux/actions'
import { UserInState } from '../Types'

const useUser = (userId: string) => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user
  const [user, setUser] = useState<UserInState>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUser = async () => {
    try {
      const url =
        userId === user_id
          ? `/api/v1/users/${userId}`
          : `/api/v1/users/${userId}/public`
      setLoading(true)
      const { data } = await axios.get(url)
      setUser(data)
      dispatch(setUser(data))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return [user, loading]
}

export default useUser
