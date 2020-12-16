import React from 'react'

import FormSlider from './components/FormSlider'
import './App.scss'

const App = () => {
  return (
    <>
      <div style={{ width: '200px', padding: '20px' }}>
        <FormSlider labelText='Distance from location' />
      </div>
      <div style={{ width: '600px', padding: '20px' }}>
        <FormSlider
          maxRange={250}
          labelText='Distance from location'
          defaultValue={50}
        />
      </div>
    </>
  )
}

export default App
