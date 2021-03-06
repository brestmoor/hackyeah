const express = require('express')

const app = express()

app.get('/assets/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/${req.originalUrl}`)
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`)
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
