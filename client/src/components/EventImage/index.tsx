import React from 'react'

import { EventImageProps } from '../../Types'
import './EventImage.scss'

const EventImage = ({ src, alt, ...rest }: EventImageProps) => {
  return <img className='event-image' src={src} alt={alt} {...rest} />
}

export default EventImage
