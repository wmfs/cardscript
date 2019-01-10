// const path = require('path')
const docGenerator = require('./../lib/')

console.log('generate doc script...')

docGenerator.writeFile(
  {
    targetPath: './../temp-changes/README.md',
    sdkRoot: 'c:/development/cardscript/packages/tymly-cardscript-sdk'
  }
)
