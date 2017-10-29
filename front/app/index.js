import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Search from './components/Search/Search'
import Map from './components/Map/Map'
import SidePanel from './components/SidePanel/SidePanel'

class App extends Component {
  constructor () {
    super()

    this.state = {
      sidePanelOpen: false,
      sidePanelData: null
    }

    this.handleWeatherIconClick = this.handleWeatherIconClick.bind(this)
    this.handlePanelRequestClose = this.handlePanelRequestClose.bind(this)
  }

  handleWeatherIconClick (data) {
    this.setState({
      sidePanelOpen: true,
      sidePanelData: data
    })
  }

  handlePanelRequestClose () {
    this.setState({
      sidePanelOpen: false
    })
  }

  render () {
    const { sidePanelOpen, sidePanelData } = this.state
    return (
      <div>
        <Search sidePanelOpen={sidePanelOpen} />
        <Map
          onWeatherIconOpen={this.handleWeatherIconClick}
        />
        <SidePanel
          open={sidePanelOpen}
          data={sidePanelData}
          onPanelRequestClose={this.handlePanelRequestClose}
        />
      </div>
    )
  }
}

const container = document.querySelector('#root')
ReactDOM.render(<App />, container)
