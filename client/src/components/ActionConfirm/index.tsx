import React from 'react'

import Modal from '../Modal'
import Button from '../Button'
import { ActionConfirmProps } from '../../types'
import './ActionConfirm.scss'

const ActionConfirm = ({
  setIsModalOpen,
  handleConfirm,
  text
}: ActionConfirmProps) => {
  return (
    <div className='action'>
      <Modal
        closeModal={() => setIsModalOpen(false)}
        content={
          <div className='action__wrapper'>
            <h1 className='action__title'> {text}</h1>
            <div className='action__buttons'>
              <Button
                type='button'
                text='Cancel'
                modifier='secondary'
                onClick={() => setIsModalOpen(false)}
              />
              <Button
                type='button'
                text='Confrim'
                modifier='primary'
                onClick={handleConfirm}
              />
            </div>
          </div>
        }
      />
    </div>
  )
}

export default ActionConfirm
