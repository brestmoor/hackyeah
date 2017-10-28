import React, { Component } from 'react'
import debounce from 'lodash/debounce'

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

  search () {
    API.search()
      .then((data) => {
        this.setState({
          loading: false,
          data
        })
      })
  }

  handleInput (e) {
    this.setState({
      loading: true
    })
    this.search(e.target.value)
  }

  render () {
    const { data, loading } = this.state
    return (
      <div className={style.container}>
        <input
          className={style.input}
          onInput={this.handleInput}
        />
        <div className={style.results}>
          {
            loading
              ? <div>Loading</div>
              : (
                <ul>
                  {data.map(text => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )
          }
        </div>
      </div>
    )
  }
}

export default Search
