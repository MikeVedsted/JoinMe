import React from 'react'

import { ProfileImageProps } from '../../types'
import './ProfileImage.scss'

const ProfileImage = ({ image, alt }: ProfileImageProps) => {
  return <img className='profile-image' src={image} alt={alt} />
}

export default ProfileImage
