const ejs = require('ejs')
const path = require('upath')
const cardscriptSchema = require('cardscript-schema')
const fs = require('fs')

module.exports = function (options) {
  ejs.renderFile(
    path.resolve(__dirname, './template.md.ejs'),
    cardscriptSchema.getSimpleManifest(),
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
