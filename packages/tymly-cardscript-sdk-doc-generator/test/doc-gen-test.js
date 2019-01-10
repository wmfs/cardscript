/* eslint-env mocha */

'use strict'
const path = require('path')
const Generator = require('./../lib')
const chai = require('chai')
const expect = chai.expect
const sdkRoot = require.resolve('@wmfs/tymly-cardscript-sdk')

describe('Run a doc information test', () => {
  let generator
  it('should ', () => {
    generator = new Generator(
      {
        sdkRoot: sdkRoot
      }
    )
  })

  it('should get some info about the sdk', () => {
    const info = generator.getInfo(sdkRoot)
    expect(info.name).to.equal('Oli')
  })

  it('should generate a README.md file', async () => {
    await generator.writeFile(
      path.resolve(__dirname, './test-docs/README.md')
    )
  })
})
