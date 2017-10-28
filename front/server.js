const express = require('express')

const app = express()

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`)
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Example app listening on port 3000!')
})
