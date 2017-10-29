import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Map, { toCelsius } from '../../map'

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
        {data && (
          <div>
            <h3>{data.title}</h3>
            <table className={style.table}>
              <tbody>
                {data.forecast.map(item => (
                  <tr key={item.date}>
                    <td>{item.day}</td>
                    <td>{item.date}</td>
                    <td>
                      <div>
                        <img alt={item.text} width="30" height="30" src={Map.getIcon(item.code)} />
                        {item.text}
                      </div>
                    </td>
                    <td>
                      <span>{`${toCelsius(item.low)}°C - ${toCelsius(item.high)}°C`}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

SidePanel.propTypes = {
  onPanelRequestClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object
}

SidePanel.defaultProps = {
  data: null
}

SidePanel.defaultProps = {
  onPanelRequestClose: () => {}
}

export default SidePanel
