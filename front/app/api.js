import axios from 'axios'

const baseURL = '192.168.43.73'
const port = '9091'

const api = {
  search: text => axios.get(`http://${baseURL}:${port}/rest/cities?name=${text}`)
    .then(({ data }) => data)
    .catch(() => []),
  getLatLon: id => axios.get(`http://${baseURL}:${port}/rest/cities/id?id=${id}`)
    .then(({ data }) => data)
    .catch(() => null)
}

export default api
