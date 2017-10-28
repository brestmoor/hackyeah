import axios from 'axios'

const api = {
  search: text =>
    axios.get(`http://pl-l-pc0cmhkz:9091/rest/cities?name=${text}`)
      .then(({ data }) => data)
      .catch(() => [])

}

export default api
