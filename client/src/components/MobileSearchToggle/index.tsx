import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toggleModal } from '../../redux/actions'
import { screenGreaterThan } from '../../util/helperFunctions'
import { AppState } from '../../Types'
import './MobileSearchToggle.scss'

const MobileSearchToggle = () => {
  const dispatch = useDispatch()
  const { hideModal } = useSelector((state: AppState) => state.ui)

  return (
    <div
      hidden={screenGreaterThan(768)}
      className='mobile-search-toggle'
      onClick={() => dispatch(toggleModal(hideModal))}
    >
      <FontAwesomeIcon icon='filter' />
    </div>
  )
}

export default MobileSearchToggle
