import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import AccountForm from '../../components/AccountForm'
import { addUser } from '../../redux/actions'
import { ProfilePageParamProps } from '../../types'
import './ProfileEdit.scss'

const ProfileEdit = () => {
  const { userId } = useParams<ProfilePageParamProps>()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['user'])
  const { first_name, user_id } = cookies.user
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUserInfo() {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/v1/users/${user_id}`)
        dispatch(addUser(data))
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getUserInfo()
  }, [dispatch, user_id])

  // FIX? Add loading component/icon anything if needed
  // if (loading) return <div>LOADING</div>
  return (
    !loading && (
      <div className='page'>
        <h2 className='page__title'>
          Hi {first_name}! Let&apos;s make some changes.
        </h2>
        {userId === user_id && <AccountForm userId={user_id} />}
      </div>
    )
  )
}

export default ProfileEdit
