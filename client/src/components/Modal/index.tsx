import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { ModalProps } from '../../types'
import './Modal.scss'

const Modal = ({ closeModal, content: Content }: ModalProps) => {
  return (
    <div className='modal'>
      <div className='modal__window'>
        <button className='modal__close-button' onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {Content}
      </div>
    </div>
  )
}

export default Modal
