import React, { Component } from 'react'

import Map from '../../map'

class MapComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.map = Map.getInstance()
  }

  render () {
    return (
      <div id="mapid" style={{ height: '100vh' }} />
    )
  }
}

export default MapComponent
