import React from 'react'
import ReactDOM from 'react-dom'

import Search from './components/Search/Search'
import Map from './components/Map/Map'

function App () {
  return (
    <div>
      <Search />
      <Map />
    </div>
  )
}

const container = document.querySelector('#root')
ReactDOM.render(<App />, container)
