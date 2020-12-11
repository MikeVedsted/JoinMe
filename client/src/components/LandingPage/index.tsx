import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../Button'
import './LandingPage.scss'

const LandingPage = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/home')
  }

  return (
    <div className="body">
      <div className="body__circles">
        <div className="body__circle1">
          <p className="body__highlight">
            Table Tennis Basketball, Horse Riding
          </p>
          <p className="body__text">
            ..and 28 other events are available in Helsinki which you can join!
          </p>
        </div>
        <div className="body__button">
          <Button
            type="button"
            text="Get started!"
            style="secondary"
            handleClick={handleClick}
          />
        </div>
        <div className="body__circle2">
          <p className="body__highlight">
            50 people already found event partners
          </p>
          <p className="body__text">
            ..and hundreds more are waiting for you to create events and play
            together!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
