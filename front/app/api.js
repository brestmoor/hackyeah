import axios from 'axios'

const baseURL = '5cg62261s4'
const port = '8080'

const api = {
  search: text => axios.get(`http://${baseURL}:${port}/hackyeah/rest/cities?name=${text}`)
    .then(({ data }) => data)
    .catch(() => []),
  getLatLon: id => axios.get(`http://${baseURL}:${port}/hackyeah/rest/cities/id?id=${id}`)
    .then(({ data }) => data)
    .catch(() => null),
  mapBounds: (w, s, e, n) => axios.get(`http://${baseURL}:${port}/hackyeah/rest/cities/weather?n=${n}&e=${e}&s=${s}&w=${w}`)
    .then(({ data }) => ({
      data: data[0].query.results.channel,
      alerts: JSON.parse(data[0].alerts)
    }))
    .then(({ data, alerts }) => ({ data: (Array.isArray(data) ? data : [data]), alerts }))
    .catch(() => {}),
  sendAnnotation: form => axios.post('http://5cg62261s4:8080/hackyeah/rest/alert', form)
    .then(() => true)
    .catch(() => false)
}

export default api
