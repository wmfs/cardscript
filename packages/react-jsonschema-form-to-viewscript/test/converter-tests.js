/* eslint-env mocha */

'use strict'
const chai = require('chai')
const expect = chai.expect
const path = require('path')
const Converter = require('./../lib')

describe('Run some React-jsonschema-form-to-Viewscript conversions', function () {
  it('should convert casualty care example', done => {
    Converter({
      filePath: path.resolve(__dirname, 'fixtures', 'casualty-care.json'),
      outputPath: path.resolve(__dirname, 'output', 'casualty-care.json')
    }, (err, result) => {
      if (err) return done(err)
      expect(result.title).to.eql('Casualty Care')
      expect(result.widgets.length).to.eql(83)
      done()
    })
  })

  it('should convert safe and strong example', done => {
    Converter({
      filePath: path.resolve(__dirname, 'fixtures', 'safe-and-strong.json'),
      outputPath: path.resolve(__dirname, 'output', 'safe-and-strong.json')
    }, (err, result) => {
      if (err) return done(err)
      expect(result.title).to.eql('Safe and Strong')
      expect(result.widgets.length).to.eql(30)
      done()
    })
  })
})
