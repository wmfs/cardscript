const ejs = require('ejs')
const path = require('upath')
const collateData = require('./collate-data')
const fs = require('fs')

module.exports = function qscriptDocGenerator (options) {
  // Collate data

  ejs.renderFile(
    path.resolve(__dirname, './template.md.ejs'),
    collateData(),
    {},
    (err, str) => {
      if (err) {
        console.error(err)
      } else {
        fs.writeFileSync(
          path.join(options.rootDir, 'README.md'),
          str
        )
      }
    }
  )
}
