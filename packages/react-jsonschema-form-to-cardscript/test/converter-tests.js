/* eslint-env mocha */

'use strict'
const chai = require('chai')
const expect = chai.expect
const Converter = require('./../lib')
const {
  incidentSummary,
  hydrantViewer,
  casualtyCare,
  safeAndStrong,
  generic
} = require('./fixtures')

describe('Run some React-jsonschema-form-to-cardscript conversions', () => {
  it('convert incident summary board', () => {
    const result = Converter(incidentSummary, 'board', { incidentNumber: 1234, incidentYear: 2014 })
    expect(result.body[0].type).to.eql('Jumbotron')
    expect(result.body[0].title).to.eql('Incident 1234/2014')
    expect(result.body.length).to.eql(4)
  })

  it('convert the hydrant viewer board', () => {
    const result = Converter(hydrantViewer, 'board', { hydrantNumber: 123 })
    expect(result.body.length).to.eql(3)
  })

  it('convert the casualty care form', () => {
    const result = Converter(casualtyCare, 'form')
    expect(result.body.length).to.eql(12)
  })

  it('convert the safe and strong form', () => {
    const result = Converter(safeAndStrong, 'form')
    expect(result.body.length).to.eql(5)
  })

  it('convert the generic form', () => {
    const result = Converter(generic, 'form')
    expect(result.body.length).to.eql(4)
  })
})
