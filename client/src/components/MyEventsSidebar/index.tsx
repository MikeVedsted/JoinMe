import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import Button from '../Button'
import './MyEventsSidebar.scss'

const MyEventsSidebar = () => {
  const location = useLocation()
  const history = useHistory()

  const handleClick = (id: string) => {
    history.push(id)
  }

  return (
    <div className='side-bar'>
      <Button
        type='button'
        text='My events'
        id='my-events'
        modifier={location.pathname === '/my-events' ? 'large-active' : 'large'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Interested events'
        id='interested-events'
        modifier={
          location.pathname === '/interested-events' ? 'large-active' : 'large'
        }
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Confirmed events'
        id='confirmed-events'
        modifier={
          location.pathname === '/confirmed-events' ? 'large-active' : 'large'
        }
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Create event'
        id='create-event'
        modifier={
          location.pathname === '/create-event' ? 'large-active' : 'large'
        }
        onClick={(e) => handleClick(e.target.id)}
      />
    </div>
  )
}

export default MyEventsSidebar
