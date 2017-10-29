import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import capitalize from 'lodash/capitalize'

import Popup from '../Popup/Popup'
import Map from '../../map'
import API from '../../api'

import style from './Map.scss'

class MapComponent extends Component {
  constructor (props) {
    super(props)

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
      .then(({ data, alerts } = {}) => {
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
        if (alerts && alerts.forEach) {
          alerts.forEach((item) => {
            const {
              point: { lat, lng },
              alertType,
              severity,
              comment
            } = item
            const marker = Map.setMarker(lat, lng, severity)
            marker.bindPopup(`<div style="max-width: 200px"><b>Type:</b> ${capitalize(alertType)}<br /><b>Level of Danger:</b> ${capitalize(severity)}<br />${comment ? `<b>Comments:</b> ${comment}` : ''}</div>`)
          })
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
