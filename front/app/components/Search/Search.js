import React, { Component } from 'react'
import debounce from 'lodash/debounce'

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
  }

  search (text, timestamp) {
    API.search()
      .then((data) => {
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
                    {data.map(text => (
                      <li key={text}>{text}</li>
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
