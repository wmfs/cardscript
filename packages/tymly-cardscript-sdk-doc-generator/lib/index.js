const path = require('upath')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const util = require('util')
const glob = require('glob').glob
const documentation = require('documentation')

module.exports = class CardscriptSdkDocGenerator {
  constructor (options) {
    this.options = options
    this.store = memFs.create()
    this.fs = editor.create(this.store)
    this.commit = util.promisify(this.fs.commit)
  }

  async getInfo () {
    const info = {
      name: 'Oli',
      docs: []
    }
    const fileList = await this._getFileList()
    info.docs = await documentation.build(fileList, {})
      .then(documentation.formats.md)
    return info
  }

  async writeFile (targetPath) {
    const ctx = await this.getInfo(this.options.sdkRoot)
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

  async _getFileList () {
    const globProm = function (pattern, options) {
      return new Promise((resolve, reject) => {
        glob(pattern, options, (err, files) => err === null ? resolve(files) : reject(err))
      })
    }
    let results = globProm(path.join(this.options.sdkRoot, '../*.js'), {})
    return results
  }
}
