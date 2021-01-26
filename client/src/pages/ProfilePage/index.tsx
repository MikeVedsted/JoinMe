import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import PrivateProfilePage from './PrivatePage'
import PublicProfilePage from './PublicPage'
import Loading from '../../components/Loading'
import { ProfilePageParams, AppState } from '../../Types'
import './ProfilePage.scss'

const ProfilePage = () => {
  const { userId } = useParams<ProfilePageParams>()
  const [publicMode, setPublicMode] = useState<boolean>()
  const user = useSelector((state: AppState) => state.user)
  const { loading } = useSelector((state: AppState) => state.loading)

  useEffect(() => {
    if (userId === user.user_id) {
      setPublicMode(false)
    } else {
      setPublicMode(true)
    }
  }, [userId, user.user_id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : publicMode ? (
        <PublicProfilePage />
      ) : (
        <PrivateProfilePage />
      )}
    </>
  )
}

export default ProfilePage
