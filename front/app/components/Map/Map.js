import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import Popup from '../Popup/Popup'
import Map from '../../map'
import API from '../../api'

import style from './Map.scss'

class MapComponent extends Component {
  constructor (props) {
    super(props)

    this.can = true
    this.mapMoveEnd = debounce(this.mapMoveEnd.bind(this), 250)
  }

  componentDidMount () {
    this.map = Map.getInstance()

    this.map.on('moveend', () => {
      this.mapMoveEnd()
    })
  }

  mapMoveEnd () {
    const { onWeatherIconOpen } = this.props
    const { lat: s, lng: w } = this.map.getBounds()._southWest
    const { lat: n, lng: e } = this.map.getBounds()._northEast

    this.can = false
    API.mapBounds(w, s, e, n)
      .then((data) => {
        if (data && data.forEach) {
          data.forEach(({ item }) => {
            const { condition, lat, long } = item
            const key = `${lat}-${long}`
            if (!Map.has(key)) {
              Map.set(key, item)
              const icon = Map.setIcon(lat, long, condition.code, condition.temp)
              icon.on('click', () => {
                onWeatherIconOpen(item)
              })
            }
          })
          Map.refreshClusters()
        }
      })
  }

  render () {
    return [
      <div key="map" id="mapid" style={{ height: '100vh' }} />,
      <Popup key="popup" />,
      <button
        key="button"
        className={style.currentLocalization}
        onClick={Map.setCurrentLocation}
      >
        ◎
      </button>
    ]
  }
}

MapComponent.propTypes = {
  onWeatherIconOpen: PropTypes.func
}

MapComponent.defaultProps = {
  onWeatherIconOpen: () => {}
}

export default MapComponent
