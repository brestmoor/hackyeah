module.exports = {
  devtool: 'source-map',
  context: `${__dirname}/app`,
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  }
}
