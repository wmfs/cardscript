const {readdirSync} = require('fs')
const {resolve} = require('path')
const {readFileSync} = require('jsonfile')

module.exports = function getPackageInfo () {
  const packageDirs = readdirSync(resolve(__dirname, '../../'))

  return packageDirs.map(dir => {
    const packagePath = resolve(__dirname, '../../', dir, 'package.json')
    const pkg = readFileSync(packagePath)
    return {
      name: pkg.name,
      description: pkg.description,
      repo: pkg.repository.url,
      npm: `https://www.npmjs.com/package/${pkg.name}`
    }
  })
}
