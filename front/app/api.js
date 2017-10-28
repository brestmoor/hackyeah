import axios from 'axios'

const api = {
  search: text => axios.get(`http://192.168.43.73:9091/rest/cities?name=${text}`)
    .then(({ data }) => data)
    .catch(() => []),
  getLatLon: id => axios.get(`http://192.168.43.73:9091/rest/cities/id?id=${id}`)
    .then(({ data }) => data)
    .catch(() => null),
  mapBounds: (w, s, e, n) => axios.get(`http://192.168.43.73:9091/rest/cities/id?id=${w}`) //eslint-disable-line
    .then(({ data }) => data)
    .catch(() => null)
}

export default api
