import axios from 'axios'

const baseURL = '192.168.43.73'
const port = '9091'

const api = {
  search: text => axios.get(`http://${baseURL}:${port}/rest/cities?name=${text}`)
    .then(({ data }) => data)
    .catch(() => []),
  getLatLon: id => axios.get(`http://${baseURL}:${port}/rest/cities/id?id=${id}`)
    .then(({ data }) => data)
    .catch(() => null),
  mapBounds: (w, s, e, n) => axios.get('http://5cg62261s4:8080/hackyeah/rest/cities/weather?n=53.956&e=25.356&s=49.554&w=15.139') // axios.get(`http://5cg62261s4:8080/hackyeah/rest/cities/weather?w=${w}&s=${s}&e=${e}&n=${n}`)
    .then(({ data }) => JSON.parse(data[0]).query.results.channel)
    .catch(() => null)
}

export default api
