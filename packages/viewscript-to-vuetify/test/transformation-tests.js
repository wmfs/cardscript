/* eslint-env mocha */

'use strict'
const viewscriptToVuetify = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript-to-Vuetify conversions', function () {
  it('should convert simple example', function () {
    const vuetifyTemplate = viewscriptToVuetify(examples.simple)
    expect(vuetifyTemplate).to.be.a('string')
  })
})
