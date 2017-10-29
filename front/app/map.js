import L from 'leaflet'

require('leaflet.markercluster/dist/leaflet.markercluster')

export const toCelsius = temp => Math.round((temp - 32) * (5 / 9))

const Map = (() => {
  let map = null
  let markers = null
  const data = {}

  const getIcon = (code) => {
    switch (code) {
      case '3':
      case '4':
      case '37':
      case '38':
      case '45':
      case '47':
        return './assets/Thunderstorms.png'
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
      case '11':
      case '12':
      case '13':
      case '39':
      case '40':
        return './assets/Drizzle.png'
      case '14':
      case '15':
      case '16':
      case '17':
      case '18':
      case '41':
      case '42':
      case '43':
      case '46':
        return './assets/Snow.png'
      case '19':
      case '20':
      case '21':
      case '22':
      case '23':
        return './assets/Haze.png'
      case '24':
      case '25':
      case '26':
      case '27':
      case '28':
      case '29':
      case '30':
      case '44':
        return './assets/Cloudy3.png'
      case '35':
        return './assets/Slight Drizzle.png'
      default:
        return './assets/Sunny.png'
    }
  }

  const setIcon = (latitude, longitude, code, temp) => {
    const celcius = toCelsius(temp)
    const iconSun = new L.DivIcon({
      className: 'clear',
      html: `<div class="weather-icon"><img width="60" height="60" src="${getIcon(code)}"/><div>${celcius}°C</div></div>`
    })

    const marker = L.marker([latitude, longitude], { icon: iconSun })
    markers.addLayer(marker)

    return marker
  }

  const setCurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => (
        map.setView([position.coords.latitude, position.coords.longitude], 13)
      ))
    }
  }

  const initMap = () => {
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 9,
      minZoom: 4,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map)
  }

  const createMap = () => {
    map = L.map('mapid', {
      maxZoom: 9
    }).setView([51.509865, -0.118092], 13)
    markers = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const children = cluster.getAllChildMarkers()
        const item = children[0]
        return item.options.icon
      }
    })
    map.addLayer(markers)

    initMap()

    return map
  }

  return {
    getInstance () {
      if (!map) {
        map = createMap()
      }
      return map
    },
    setLocation (lat, lon) {
      map.setView([lat, lon], 13)
    },
    setIcon,
    has (key) {
      return !!data[key]
    },
    set (key, item) {
      data[key] = item
    },
    get (key) {
      return data[key]
    },
    refreshClusters () {
      markers.refreshClusters()
    },
    setCurrentLocation,
    getIcon
  }
})()

export default Map
