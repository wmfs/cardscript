const {readdirSync} = require('fs')
const {resolve} = require('path')
const {readFileSync} = require('jsonfile')

module.exports = function getPackageInfo () {

  const packages = []
  const packageDirs = readdirSync(resolve(__dirname, '../../'))

  packageDirs.forEach(
    function (dir) {
      const packagePath = resolve(__dirname, '../../', dir, 'package.json')
      const pkg = readFileSync(packagePath)
      packages.push(
        {
          name: pkg.name,
          description: pkg.description,
          repo: pkg.repository.url,
          npm: `https://www.npmjs.com/package/${pkg.name}`
        }
      )
    }
  )

  return packages
}