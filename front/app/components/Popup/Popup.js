import React, { Component } from 'react'
import cx from 'classnames'
import L from 'leaflet'

import Map from '../../map'
import API from '../../api'

import style from './Popup.scss'

class Popup extends Component {
  constructor () {
    super()

    this.state = {
      popupVisible: false,
      popupOpen: false,
      form: {}
    }

    this.hidePopup = this.hidePopup.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.map = Map.getInstance()

    this.map.on('click', this.hidePopup)

    this.map.on('dblclick', (e) => {
      const { latlng: { lat, lng } } = e
      Map.setLocation(lat, lng)
      this.marker = L.marker([lat, lng]).addTo(this.map)
      this.setState({
        popupVisible: true,
        form: { point: { lat, lng } }
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

  updateForm (object) {
    this.setState(({ form }) => ({
      form: Object.assign({}, form, object)
    }))
  }

  handleSubmit () {
    API.sendAnnotation(this.state.form)
      .then(() => {
        this.map.fire('moveend')
      })
    this.setState({
      form: {}
    }, () => {
      this.hidePopup()
    })
  }

  render () {
    const { form, popupVisible, popupOpen } = this.state
    return (
      <div>
        {popupVisible && (
          <div className={cx(style.popup, popupOpen && style.popupOpen)}>
            <div>Add annotation:</div>
            <div>Type:</div>
            <select onChange={e => this.updateForm({ alertType: e.target.value })}>
              <option disabled selected value> -- select an option -- </option>
              <option value="hurricane">Hurricane</option>
              <option value="tornado">Tornado</option>
              <option value="tsunami">Tsunami</option>
              <option value="flood">Flood</option>
              <option value="earthquake">Earthquake</option>
              <option value="dust_storm">Duststorm</option>
              <option value="heavy_thunderstorm">Heavy Thunderstorm</option>
              <option value="heavy_snow">Heavy Snow</option>
            </select>
            <div>Level of danger:</div>
            <select onChange={e => this.updateForm({ severity: e.target.value })}>
              <option disabled selected value> -- select an option -- </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div>Comments</div>
            <textarea
              onInput={e => this.updateForm({ comment: e.target.value })}
              placeholder="Describe the issue..."
            />
            <button
              disabled={!form.alertType || !form.severity}
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Popup
