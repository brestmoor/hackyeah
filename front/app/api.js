import axios from 'axios'

const protocol = 'https'
const baseURL = 'coolweather.eu-gb.mybluemix.net'
const port = '443'

const api = {
  search: text => axios.get(`${protocol}://${baseURL}:${port}/rest/cities?name=${text}`)
    .then(({ data }) => data)
    .catch(() => []),
  getLatLon: id => axios.get(`${protocol}://${baseURL}:${port}/rest/cities/id?id=${id}`)
    .then(({ data }) => data)
    .catch(() => null),
  mapBounds: (w, s, e, n) => axios.get(`${protocol}://${baseURL}:${port}/rest/cities/weather?n=${n}&e=${e}&s=${s}&w=${w}`)
    .then(({ data }) => ({
      data: data[0].query.results.channel,
      alerts: JSON.parse(data[0].alerts)
    }))
    .then(({ data, alerts }) => ({ data: (Array.isArray(data) ? data : [data]), alerts }))
    .catch(() => {}),
  sendAnnotation: form => axios.post(`${protocol}://${baseURL}:${port}/rest/alert`, form)
    .then(() => true)
    .catch(() => false)
}

export default api
