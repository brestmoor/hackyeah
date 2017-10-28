import React from 'react'
import PropTypes from 'prop-types'

import style from './Loader.scss'

function Loading () {
  return (
    <div className={style.container}>
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
    </div>
  )
}

function Loader ({ condition, children }) {
  return (
    condition
      ? <Loading />
      : children
  )
}

Loader.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Loader
