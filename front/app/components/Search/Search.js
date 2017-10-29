import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import Map from '../../map'
import Loader from '../Loader/Loader'
import API from '../../api'

import style from './Search.scss'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      loading: false,
      data: []
    }

    this.handleInput = this.handleInput.bind(this)
    this.searchCities = debounce(this.searchCities.bind(this), 250)
    this.searchLagLng = debounce(this.searchLagLng.bind(this), 250)
  }

  componentDidMount () {
    this.map = Map.getInstance()
    this.map.on('click', () => {
      this.setState({
        data: [],
        loading: false
      })
    })
  }

  searchCities (text, timestamp) {
    API.search(text)
      .then((data) => {
        if (timestamp === this.inputTimestamp) {
          this.setState({
            loading: false,
            data
          })
        }
      })
  }

  searchLagLng (id, timestamp) {
    API.getLatLon(id)
      .then((data) => {
        if (data && timestamp === this.latLngTimestamp) {
          Map.setLocation(data.lat, data.lng)
        }
      })
  }

  handleInput (e) {
    this.inputTimestamp = +new Date()
    this.setState({
      loading: true
    })
    const text = e.target.value
    if (text.length) {
      this.searchCities(text, this.inputTimestamp)
    } else {
      this.setState({
        loading: false,
        data: []
      })
    }
  }

  centerMap (id) {
    this.latLngTimestamp = +new Date()
    this.searchLagLng(id, this.latLngTimestamp)
  }

  render () {
    const { data, loading } = this.state
    const { sidePanelOpen } = this.props
    return (
      <div className={style.container} {...(sidePanelOpen && { style: { right: 305 } })}>
        <input
          className={style.input}
          onInput={this.handleInput}
          placeholder="Enter city name"
        />
        {
          data.length || loading
            ? (
              <div className={style.results}>
                <Loader condition={loading}>
                  <ul>
                    {data.map(v => (
                      <li key={v.id}>
                        <div
                          role="button"
                          onClick={() => this.centerMap(v.id)}
                          onKeyDown={e => e.keyCode === 13 && this.centerMap(v.id)}
                          tabIndex="0"
                        >
                          {v.name},&#32;{v.country}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Loader>
              </div>
            )
            : null
        }
      </div>
    )
  }
}

Search.propTypes = {
  sidePanelOpen: PropTypes.bool.isRequired
}

export default Search
