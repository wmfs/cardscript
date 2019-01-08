const ejs = require('ejs')
const path = require('upath')
const getSimpleManifest = require('./get-simple-manifest')
const fs = require('fs')

module.exports = function cardscriptDocGenerator (options) {
  ejs.renderFile(
    path.resolve(__dirname, './template.md.ejs'),
    getSimpleManifest(),
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
