/* eslint-env mocha */

'use strict'
const viewscriptToVuetify = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript-to-Vuetify conversions', function () {
  it('should convert simple example', function () {
    const vuetifyTemplate = viewscriptToVuetify(examples.simple)
    expect(vuetifyTemplate.template).to.be.a('string')
    console.log(vuetifyTemplate)
  })

  it('should convert complex example', function () {
    const vuetifyTemplate = viewscriptToVuetify(examples.complex)
    expect(vuetifyTemplate.template).to.be.a('string')
    console.log(vuetifyTemplate)
  })

  it('should convert kitchenSink example', function () {
    const vuetifyTemplate = viewscriptToVuetify(examples.kitchenSink)
    expect(vuetifyTemplate.template).to.be.a('string')
    console.log(vuetifyTemplate)
  })

  it('should convert subView example', function () {
    const vuetifyTemplate = viewscriptToVuetify(examples.subView)
    expect(vuetifyTemplate.template).to.be.a('string')
    console.log(vuetifyTemplate)
  })
})
