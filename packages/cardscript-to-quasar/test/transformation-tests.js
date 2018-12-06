/* eslint-env mocha */

'use strict'
const cardscriptToQuasar = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const { simple, complex } = require('cardscript-examples')

describe('Run some Cardscript-to-Quasar conversions', function () {
  it('should convert simple example', function () {
    const quasarTemplate = cardscriptToQuasar(simple)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  it('should convert complex example', function () {
    const quasarTemplate = cardscriptToQuasar(complex)
    expect(quasarTemplate.template).to.be.a('string')
    console.log(quasarTemplate)
  })

  // it('should convert kitchenSink example', function () {
  //   const quasarTemplate = cardscriptToQuasar(examples.kitchenSink)
  //   expect(quasarTemplate.template).to.be.a('string')
  //   console.log(quasarTemplate)
  // })
  //
  // it('should convert subView example', function () {
  //   const quasarTemplate = cardscriptToQuasar(examples.subView)
  //   expect(quasarTemplate.template).to.be.a('string')
  //   console.log(quasarTemplate)
  // })
})
