import React from 'react'

import Modal from '../Modal'
import Button from '../Button'

const ActionConfirm = ({ setIsModalOpen, handleConfirm, text }: any) => {
  return (
    <Modal
      closeModal={() => setIsModalOpen(false)}
      content={
        <div className='event__modal'>
          <h1 className='event__modal-title'> {text}</h1>
          <div className='event__modal-buttons'>
            <Button
              type='button'
              text='Cancel'
              modifier='secondary'
              onClick={() => console.log('handle')}
            />
            <Button
              type='button'
              text='Confrim'
              modifier='primary'
              onClick={() => console.log('handle')}
            />
          </div>
        </div>
      }
    />
  )
}

export default ActionConfirm
