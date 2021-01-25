import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../Modal'
import ModalMessageCancel from '../ModalMessageCancel'
import EventParticipantsAndRequests from '../EventParticipantsAndRequests'
import useEventParticipants from '../../hooks/useEventParticipants'
import useEventRequests from '../../hooks/useEventRequests'
import { closeModal, endEvent, toggleModal } from '../../redux/actions'
import { EventManageDropDownProps, AppState } from '../../Types'
import './EventManageDropDown.scss'

const EventManageDropDown = ({ eventId, hide }: EventManageDropDownProps) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { hideModal } = useSelector((state: AppState) => state.ui)
  const [modalContent, setModalContent] = useState('')
  const [participants] = useEventParticipants(eventId)
  const [requests] = useEventRequests(eventId)

  const handleModal = (content: string) => {
    setModalContent(content)
    dispatch(toggleModal(hideModal))
  }

  return (
    <ul hidden={hide} className={`drop-down drop-down`}>
      {!hideModal && modalContent === 'cancel' && (
        <Modal
          content={
            <ModalMessageCancel
              title={`Are you sure you want to cancel the event?`}
              additionalText='The event, including comments and participant information, will be permanently deleted and it cannot be undone.'
              confirmFunction={() => dispatch(endEvent(eventId))}
              cancelFunction={() => dispatch(closeModal())}
            />
          }
        />
      )}

      {!hideModal && modalContent === 'PsAndRs' && (
        <Modal
          content={
            <EventParticipantsAndRequests
              joinRequests={requests}
              participants={participants}
            />
          }
        />
      )}

      <li onClick={() => handleModal('PsAndRs')} className='drop-down__item'>
        Participants
      </li>
      <li onClick={() => handleModal('cancel')} className='drop-down__item'>
        End event
      </li>
      <li
        className='drop-down__item'
        onClick={() => history.push(`/event/${eventId}/edit`)}
      >
        Edit event
      </li>
    </ul>
  )
}

export default EventManageDropDown
