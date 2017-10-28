import React from 'react'
import ReactDOM from 'react-dom'

import Map from './components/Map/Map'

function App () {
  return (
    <div>
      <Map />
    </div>
  )
}

const container = document.querySelector('#root')
ReactDOM.render(<App />, container)
