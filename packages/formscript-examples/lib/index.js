const jsonfile = require('jsonfile')
const path = require('path')

module.exports = function getExample (filename) {
  return jsonfile.readFileSync(path.resolve(__dirname, `../fixtures/${filename}.json`))
}
