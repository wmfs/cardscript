/* eslint-env mocha */

'use strict'
const chai = require('chai')
const expect = chai.expect
const path = require('path')
const Converter = require('./../lib')
const options = {
  filePath: path.resolve(__dirname, 'fixtures', 'casualty-care.json'),
  outputPath: path.resolve(__dirname, 'output', 'casualty-care.json')
}

describe('Run some React-jsonschema-form-to-Viewscript conversions', function () {
  it('should convert simple example', done => {
    Converter(options, (err, result) => {
      if (err) return done(err)
      expect(result.title).to.eql('Casualty Care')
      expect(result.widgets.length).to.eql(83)
      done()
    })
  })
})
