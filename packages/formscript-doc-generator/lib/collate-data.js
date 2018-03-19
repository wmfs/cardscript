
const jsonfile = require('jsonfile')
const path = require('path')

module.exports = function collateData () {
  const lernaJson = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../lerna.json')
  )

  const data = {
    version: lernaJson.version
  }
  return data
}
