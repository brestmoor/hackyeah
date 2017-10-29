import L from 'leaflet'

const Map = (() => {
  let map = null

  const setIcon = (latitude, longitude) => {
    const iconSun = L.icon({
      iconUrl: './assets/sunny.png',
      iconSize: [60, 60]
    })
    L.marker([latitude + 0.08, longitude], { icon: iconSun }).addTo(map)
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
      maxZoom: 8,
      minZoom: 3,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map)
  }

  const createMap = () => {
    map = L.map('mapid').setView([51.509865, -0.118092], 13)

    initMap()

    setIcon(50.064663, 19.910210)
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
    setIcon
  }
})()

export default Map
