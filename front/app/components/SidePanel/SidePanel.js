import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Map from '../../map'

import style from './SidePanel.scss'

class SidePanel extends Component {
  componentDidMount () {
    this.map = Map.getInstance()

    const { onPanelRequestClose } = this.props
    this.map.on('click', onPanelRequestClose)
  }

  render () {
    const { open, data } = this.props
    return (
      <div className={cx(style.sidePanel, open && style.sidePanelOpen)}>
        {data}
      </div>
    )
  }
}

SidePanel.propTypes = {
  onPanelRequestClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
}

SidePanel.defaultProps = {
  onPanelRequestClose: () => {}
}

export default SidePanel
