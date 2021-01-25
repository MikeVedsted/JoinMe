import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { closeModal } from '../../redux/actions'
import { ModalProps } from '../../Types'
import './Modal.scss'

const Modal = ({ content }: ModalProps) => {
  const dispatch = useDispatch()

  return (
    <div className='modal'>
      <div className='modal__window'>
        <button
          className='modal__close-button'
          onClick={() => dispatch(closeModal())}
        >
          <FontAwesomeIcon icon='times' />
        </button>
        <div className='modal__content'>{content}</div>
      </div>
    </div>
  )
}

export default Modal
