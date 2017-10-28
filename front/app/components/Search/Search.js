import React, { Component } from 'react'
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
    this.search = debounce(this.search.bind(this), 500)
    this.mapMoveEnd = debounce(this.mapMoveEnd.bind(this), 500)
  }

  componentDidMount () {
    this.map = Map.getInstance()
    this.map.on('click', () => {
      this.setState({
        data: [],
        loading: false
      })
    })

    this.map.on('moveend', () => {
      this.mapMoveEnd()
    })
  }

  mapMoveEnd () {
    const { lat: w, lng: s } = this.map.getBounds()._southWest // eslint-disable-line
    const { lat: e, lng: n } = this.map.getBounds()._northEast // eslint-disable-line

    API.mapBounds(w, s, e, n)
      .then((data) => {
        console.log(data)
      })
  }

  search (text, timestamp) {
    API.search(text)
      .then((data) => {
        console.log(data)
        if (timestamp === this.timestamp) {
          this.setState({
            loading: false,
            data
          })
        }
      })
  }

  handleInput (e) {
    this.timestamp = +new Date()
    this.setState({
      loading: true
    })
    const text = e.target.value
    if (text.length) {
      this.search(text, this.timestamp)
    } else {
      this.setState({
        loading: false,
        data: []
      })
    }
  }

  centerMap (id) {
    API.getLatLon(id)
      .then((data) => {
        if (data) {
          Map.setLocation(data.lng, data.lat)
        }
      })
  }

  render () {
    const { data, loading } = this.state
    return (
      <div className={style.container}>
        <input
          className={style.input}
          onInput={this.handleInput}
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

export default Search
