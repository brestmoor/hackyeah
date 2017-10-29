import L from 'leaflet'

require('leaflet.markercluster/dist/leaflet.markercluster')

const Map = (() => {
  let map = null
  let markers = null
  const data = {}

  const getIcon = (code) => {
    switch (code) {
      case '3':
      case '4':
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
        return './assets/Drizzle.png'
      case '14':
      case '15':
      case '16':
      case '17':
      case '18':
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
        return './assets/Cloudy3.png'
      case '31':
      case '32':
      case '33':
      case '34':
        return './assets/Sunny.png'
      case '35':
        return './assets/Slight Drizzle.png'
      case '36':
        return './assets/Sunny.png'
      default:
        return './assets/Sunny.png'
    }
  }

  const setIcon = (latitude, longitude, code, temp) => {
    const iconSun = L.icon({
      iconUrl: getIcon(code),
      iconSize: [60, 60]
    })
    const marker = L.marker([latitude, longitude], { icon: iconSun })
    marker.bindTooltip(`${Math.round((temp - 32) * (5 / 9))}°C`)
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
      maxZoom: 13,
      minZoom: 4,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map)
  }

  const createMap = () => {
    map = L.map('mapid', {
      maxZoom: 20
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

    setCurrentLocation()

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
    }
  }
})()

export default Map
