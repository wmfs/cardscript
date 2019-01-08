const path = require('path')
const { generator } = require('./../lib')

console.log('generate doc script...')

generator({ rootDir: path.resolve(__dirname, './../temp-changes') })
