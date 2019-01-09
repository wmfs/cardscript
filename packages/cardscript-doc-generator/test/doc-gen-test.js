/* eslint-env mocha */

'use strict'
const path = require('path')
const generator = require('./../lib')

describe('Run a doc generation test', () => {
  it('should produce a readme doc', () => {
    generator({ rootDir: path.resolve(__dirname, './test-docs') })
  })
})
