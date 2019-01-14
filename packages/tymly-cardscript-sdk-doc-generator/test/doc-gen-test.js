/* eslint-env mocha */

'use strict'
const path = require('path')
const Generator = require('./../lib')
const chai = require('chai')
const expect = chai.expect
const sdkRoot = require.resolve('@wmfs/tymly-cardscript-sdk')

describe('Run SDK documentation generation tests', async () => {
  let generator
  it('should create a new Generator', async () => {
    generator = new Generator(
      {
        sdkRoot: sdkRoot
      }
    )
  }).timeout(10000)

  it('should get some info about the sdk', async () => {
    const info = await generator.getInfo(sdkRoot)
    expect(info.name).to.equal('Oli')
  }).timeout(10000)

  it('should generate a README.md file', async () => {
    await generator.writeFile(
      path.resolve(__dirname, './test-docs/README.md')
    )
  }).timeout(10000)
})
