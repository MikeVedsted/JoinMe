import React from 'react'

import Button from '../Button'
import { ModalMessageCancelProps } from '../../Types'
import './ModalMessageCancel.scss'

const ModalMessageCancel = ({
  title,
  additionalText,
  cancelFunction,
  confirmFunction
}: ModalMessageCancelProps) => {
  return (
    <>
      <h2 className='modal__title'>{title}</h2>
      <p className='modal__text'>{additionalText}</p>
      <div className='modal__buttons'>
        <Button
          type='button'
          text='Cancel'
          modifier='secondary'
          onClick={cancelFunction}
        />
        <Button
          type='button'
          text='Confirm'
          modifier='primary'
          onClick={confirmFunction}
        />
      </div>
    </>
  )
}

export default ModalMessageCancel
