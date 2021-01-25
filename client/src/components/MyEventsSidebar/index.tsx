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
      <h3 className='side-bar__title'>My events</h3>
      <Button
        type='button'
        text='Hosted'
        id='hosted'
        modifier={pathname.includes('/hosted') ? 'primary' : 'secondary'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Interested'
        id='interested'
        modifier={pathname.includes('/interested') ? 'primary' : 'secondary'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Confirmed'
        id='confirmed'
        modifier={pathname.includes('/confirmed') ? 'primary' : 'secondary'}
        onClick={(e) => handleClick(e.target.id)}
      />
      <Button
        type='button'
        text='Create'
        id='create-new'
        modifier={pathname.includes('/create-new') ? 'primary' : 'secondary'}
        onClick={(e) => handleClick(e.target.id)}
      />
    </div>
  )
}

export default MyEventsSidebar
