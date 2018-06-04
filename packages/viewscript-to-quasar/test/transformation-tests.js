/* eslint-env mocha */

'use strict'
const viewscriptToQuasar = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript-to-Quasar conversions', function () {
  it('should convert simple example', function () {
    const quasarTemplate = viewscriptToQuasar(examples.simple)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert complex example', function () {
    const quasarTemplate = viewscriptToQuasar(examples.complex)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert kitchenSink example', function () {
    const quasarTemplate = viewscriptToQuasar(examples.kitchenSink)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert subView example', function () {
    const quasarTemplate = viewscriptToQuasar(examples.subView)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })
})
