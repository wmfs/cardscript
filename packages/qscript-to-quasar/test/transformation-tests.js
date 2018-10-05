/* eslint-env mocha */

'use strict'
const qscriptToQuasar = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('qscript-examples')

describe('Run some QScript-to-Quasar conversions', function () {
  it('should convert simple example', function () {
    const quasarTemplate = qscriptToQuasar(examples.simple)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert complex example', function () {
    const quasarTemplate = qscriptToQuasar(examples.complex)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert kitchenSink example', function () {
    const quasarTemplate = qscriptToQuasar(examples.kitchenSink)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert subView example', function () {
    const quasarTemplate = qscriptToQuasar(examples.subView)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })
})
