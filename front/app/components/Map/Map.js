import React, { Component } from 'react'
import L from 'leaflet'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.getLocation = this.getLocation.bind(this)
    this.setIcon = this.setIcon.bind(this)
  }

  componentDidMount () {
    this.getLocation()
    this.mymap = L.map('mapid').setView([51.509865, -0.118092], 13)
    this.setIcon(50.064663, 19.910210)

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.mymap)
  }

  getLocation () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.mymap.setView([position.coords.latitude, position.coords.longitude], 13))
    }
  }

  setIcon (latitude, longitude) {
    const iconSun = L.icon({
      iconUrl: './assets/sun.PNG',
      iconSize: [40, 40]
    })
    L.marker([latitude, longitude], { icon: iconSun }).addTo(this.mymap)
  }

  render () {
    return (
      <div id="mapid" style={{ height: '100vh' }} />
    )
  }
}

export default Map
