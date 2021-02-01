import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IconButtonProps } from '../../Types'
import './IconButton.scss'

const IconButton = ({
  type,
  icon,
  size,
  modifier,
  ...rest
}: IconButtonProps) => {
  return (
    <button type={type} className={`icon icon--${modifier}`} {...rest}>
      <FontAwesomeIcon icon={icon} size={size} />
    </button>
  )
}

export default IconButton
