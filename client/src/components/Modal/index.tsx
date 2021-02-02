import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { closeModal, toggleModal } from '../../redux/actions'
import { ModalProps, AppState } from '../../Types'
import './Modal.scss'

const Modal = ({ content }: ModalProps) => {
  const dispatch = useDispatch()
  const node = useRef() as React.MutableRefObject<HTMLDivElement>
  const { hideModal } = useSelector((state: AppState) => state.ui)

  const handleClickOutside = (e: any) => {
    !node.current.contains(e.target) && dispatch(toggleModal(hideModal))
  }

  useEffect(() => {
    hideModal
      ? document.removeEventListener('click', handleClickOutside)
      : document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  return (
    <div className='modal'>
      <div ref={node} className='modal__window'>
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
