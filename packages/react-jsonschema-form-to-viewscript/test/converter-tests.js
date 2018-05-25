/* eslint-env mocha */

'use strict'
const fs = require('fs')
const chai = require('chai')
const expect = chai.expect
const path = require('path')
const Converter = require('./../lib')

describe('Run some React-jsonschema-form-to-Viewscript conversions', function () {
  it('should convert casualty care form', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'casualty-care.json')))
    const result = Converter(reactJsonSchemaForm, 'form')
    expect(result.title).to.eql('Casualty Care')
    expect(result.widgets.length).to.eql(84)
  })

  it('should convert safe and strong form', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'safe-and-strong.json')))
    const result = Converter(reactJsonSchemaForm, 'form')
    expect(result.title).to.eql('Safe and Strong')
    expect(result.widgets.length).to.eql(34)
  })

  it('should convert hydrant viewer board with data', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'hydrant-viewer.json')))
    const result = Converter(reactJsonSchemaForm, 'board', {hydrantNumber: '1234'})
    expect(result.title).to.eql('Hydrant 1234')
  })

  it('should convert hydrant viewer board without data', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'hydrant-viewer.json')))
    const result = Converter(reactJsonSchemaForm, 'board')
    expect(result.title).to.eql('Hydrant ${hydrantNumber}') // eslint-disable-line
  })

  it('should convert incident summary board with data', async () => {
    const reactJsonSchemaForm = JSON.parse(await readFile(path.resolve(__dirname, 'fixtures', 'incident-summary.json')))
    const result = Converter(reactJsonSchemaForm, 'board', {incidentNumber: 1234, incidentYear: 2018})
    expect(result.title).to.eql('Incident 1234/2018')
  })
})

function readFile (path) {
  return new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => {
    if (err) reject(err)
    else resolve(data)
  }))
}
