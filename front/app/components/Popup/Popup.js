import React, { Component } from 'react'
import cx from 'classnames'
import L from 'leaflet'

import Map from '../../map'

import style from './Popup.scss'

class Popup extends Component {
  constructor () {
    super()

    this.state = {
      popupVisible: false,
      popupOpen: false
    }

    this.hidePopup = this.hidePopup.bind(this)
  }

  componentDidMount () {
    this.map = Map.getInstance()

    this.map.on('click', this.hidePopup)

    this.map.on('dblclick', (e) => {
      const { latlng: { lat, lng } } = e
      Map.setLocation(lat, lng)
      this.marker = L.marker([lat, lng]).addTo(this.map)
      this.setState({
        popupVisible: true
      }, () => {
        setTimeout(() => {
          this.setState({
            popupOpen: true
          })
        })
      })
    })
  }

  hidePopup () {
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker)
    }
    this.setState({
      popupVisible: false,
      popupOpen: false
    })
  }

  render () {
    const { popupVisible, popupOpen } = this.state
    return (
      <div>
        {popupVisible && (
          <div className={cx(style.popup, popupOpen && style.popupOpen)}>
            <span>Add annotation:</span>
            <select>
              <option>Tornado</option>
              <option>Wind</option>
              <option>Tsunami</option>
            </select>
            <textarea placeholder="Describe the issue..." />
          </div>
        )}
      </div>
    )
  }
}

export default Popup
