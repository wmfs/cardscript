const ejs = require('ejs')
const path = require('upath')
const collateData = require('./collate-data')
const fs = require('fs')

module.exports = function viewscriptDocGenerator (options) {
  // Collate data

  ejs.renderFile(
    path.resolve(__dirname, './template.md.ejs'),
    collateData(),
    {},
    function (err, str) {
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
