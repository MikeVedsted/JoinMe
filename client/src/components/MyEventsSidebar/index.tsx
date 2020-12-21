import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import Button from '../Button'
import './MyEventsSidebar.scss'

const MyEventsSidebar = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  const handleClick = (id: string) => {
    history.push(id)
  }

  return (
    <div className='side-bar'>
      <Button
        type='button'
        text='My events'
        id='created'
        modifier={pathname.includes('/created') ? 'large-active' : 'large'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Interested events'
        id='interested'
        modifier={pathname.includes('/interested') ? 'large-active' : 'large'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Confirmed events'
        id='confirmed'
        modifier={pathname.includes('/confirmed') ? 'large-active' : 'large'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Create event'
        id='create-new'
        modifier={pathname.includes('/create-new') ? 'large-active' : 'large'}
        onClick={(e) => handleClick(e.target.id)}
      />
    </div>
  )
}

export default MyEventsSidebar
