import React from 'react'
import ReactDOM from 'react-dom'

import Search from './components/Search/Search'

function App () {
  return (
    <div>
      <Search />
    </div>
  )
}

const container = document.querySelector('#root')
ReactDOM.render(<App />, container)
