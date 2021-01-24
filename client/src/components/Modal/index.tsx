import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ModalProps } from '../../Types'
import './Modal.scss'

const Modal = ({ closeModal, content: Content }: ModalProps) => {
  return (
    <div className='modal'>
      <div className='modal__window'>
        <button className='modal__close-button' onClick={closeModal}>
          <FontAwesomeIcon icon='times' />
        </button>
        <div className='modal__content'>{Content}</div>
      </div>
    </div>
  )
}

export default Modal
