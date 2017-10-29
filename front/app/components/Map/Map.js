import React, { Component } from 'react'
import debounce from 'lodash/debounce'

import Popup from '../Popup/Popup'
import Map from '../../map'
import API from '../../api'

class MapComponent extends Component {
  constructor (props) {
    super(props)

    this.can = false
    this.mapMoveEnd = debounce(this.mapMoveEnd.bind(this), 250)
  }

  componentDidMount () {
    this.map = Map.getInstance()

    this.map.on('moveend', () => {
      this.mapMoveEnd()
    })
  }

  mapMoveEnd () {
    const { lat: w, lng: s } = this.map.getBounds()._southWest
    const { lat: e, lng: n } = this.map.getBounds()._northEast

    if (this.can) {
      this.can = false
      API.mapBounds(w, s, e, n)
        .then((data) => {
          data.forEach(({ item }) => {
            const { lat, long } = item
            Map.setIcon(lat, long)
          })
        })
    }
  }

  render () {
    return [
      <div key="map" id="mapid" style={{ height: '100vh' }} />,
      <Popup key="popup" />
    ]
  }
}

export default MapComponent
