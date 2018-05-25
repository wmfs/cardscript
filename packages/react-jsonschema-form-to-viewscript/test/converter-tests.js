/* eslint-env mocha */

'use strict'
const fs = require('fs')
const chai = require('chai')
const expect = chai.expect
const path = require('path')
const Converter = require('./../lib')

describe('Run some React-jsonschema-form-to-Viewscript conversions', function () {
  it('should convert casualty care example', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'casualty-care.json')))
    const result = Converter(reactJsonSchemaForm)
    expect(result.title).to.eql('Casualty Care')
    expect(result.widgets.length).to.eql(84)
  })

  it('should convert safe and strong example', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'safe-and-strong.json')))
    const result = Converter(reactJsonSchemaForm)
    expect(result.title).to.eql('Safe and Strong')
    expect(result.widgets.length).to.eql(34)
  })
})

function readFile (path) {
  return new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => {
    if (err) reject(err)
    else resolve(data)
  }))
}
