import React from 'react'

import { ProfileImageProps } from '../../types'
import './ProfileImage.scss'

const ProfileImage = ({ image, alt, ...rest }: ProfileImageProps) => {
  return <img className='profile-image' src={image} alt={alt} {...rest} />
}

export default ProfileImage
