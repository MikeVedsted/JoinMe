import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'
import ModalMessageCancel from '../ModalMessageCancel'
import EventParticipantsAndRequests from '../EventParticipantsAndRequests'
import useEventRequests from '../../hooks/useEventRequests'
import useEventParticipants from '../../hooks/useEventParticipants'
import { closeModal, endEvent, toggleModal } from '../../redux/actions'
import { EventManageDropDownProps, AppState } from '../../Types'
import './EventManageDropDown.scss'

const EventManageDropDown = ({ eventId }: EventManageDropDownProps) => {
  const node = useRef() as React.MutableRefObject<HTMLUListElement>
  const { hideModal } = useSelector((state: AppState) => state.ui)
  const [hideOptions, setHideOptions] = useState(true)
  const [modalContent, setModalContent] = useState('')
  const [participants] = useEventParticipants(eventId)
  const [requests] = useEventRequests(eventId)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleModal = (content: string) => {
    setModalContent(content)
    dispatch(toggleModal(hideModal))
  }

  const handleClickOutside = () => {
    setHideOptions(true)
  }

  useEffect(() => {
    hideOptions
      ? document.removeEventListener('click', handleClickOutside)
      : document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  return (
    <>
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

      <FontAwesomeIcon
        onClick={() => setHideOptions(!hideOptions)}
        className='manage-control'
        icon='ellipsis-v'
      />

      <ul ref={node} hidden={hideOptions} className='manage-dropdown'>
        <li
          onClick={() => handleModal('PsAndRs')}
          className='manage-dropdown__item'
        >
          Participants
        </li>
        <li
          onClick={() => handleModal('cancel')}
          className='manage-dropdown__item'
        >
          End event
        </li>
        <li
          className='manage-dropdown__item'
          id='edit'
          onClick={() => history.push(`/event/${eventId}/edit`)}
        >
          Edit event
        </li>
      </ul>
    </>
  )
}

export default EventManageDropDown
