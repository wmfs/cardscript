const path = require('upath')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const util = require('util')
// const documentation = require('documentation')

module.exports = class CardscriptSdkDocGenerator {
  constructor (options) {
    this.options = options
    this.store = memFs.create()
    this.fs = editor.create(this.store)
    this.commit = util.promisify(this.fs.commit)
  }

  getInfo (sdkRoot) {
    return {
      name: 'Oli'
      // docs: documentation.build(sdkRoot, {})
    }
  }

  async writeFile (targetPath) {
    const ctx = this.getInfo(this.sdkRoot)
    let templatePath = this._getTemplatePath('README.md.ejs')
    this.fs.copyTpl(
      templatePath, // from
      targetPath, // to
      ctx
    )
    return this.commit()
  }

  _getTemplatePath (templateName) {
    return path.join(__dirname, 'templates', templateName)
  }
}
