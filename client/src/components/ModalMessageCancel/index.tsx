import React from 'react'

import Button from '../Button'
import { ModalMessageCancelProps } from '../../types'
import './ModalMessageCancel.scss'

const ModalMessageCancel = ({
  title,
  additionalText,
  cancelFunction,
  confirmFunction
}: ModalMessageCancelProps) => {
  return (
    <>
      <h2 className='modal__title'>
        {title}
        <p className='modal__warning'>{additionalText}</p>
      </h2>
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
