import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toggleModal } from '../../redux/actions'
import { screenGreaterThan } from '../../util/helperFunctions'
import { MobileSearchToggleProps, AppState } from '../../Types'
import './MobileSearchToggle.scss'

const MobileSearchToggle = ({ toggle, state }: MobileSearchToggleProps) => {
  const dispatch = useDispatch()
  const { hideModal } = useSelector((state: AppState) => state.ui)

  const handleClick = () => {
    toggle(!state)
    dispatch(toggleModal(hideModal))
  }

  return (
    <div
      hidden={screenGreaterThan(768)}
      className='mobile-search-toggle'
      onClick={handleClick}
    >
      <FontAwesomeIcon icon='filter' />
    </div>
  )
}

export default MobileSearchToggle
