import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ModalProps } from '../../types'
import './Modal.scss'

const Modal = ({ closeModal, content: Content }: ModalProps) => {
  return (
    <div className='modal'>
      <div className='modal__window'>
        <button className='modal__close-button' onClick={closeModal}>
          <FontAwesomeIcon icon='times' />
        </button>
        {Content}
      </div>
    </div>
  )
}

export default Modal
