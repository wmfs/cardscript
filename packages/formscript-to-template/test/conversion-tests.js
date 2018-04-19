/* eslint-env mocha */

'use strict'
const formscriptToTemplate = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('formscript-examples')

const CONFIG = {
  template: {
    widgetTagPrefix: 'app',
    closingWidgetTags: false,
    rootTag: ['<div>', '</div>'],
    setReplacementTag: 'template',
    conditionalAttributeTemplate: 'v-if="$$EXPRESSION$$"',
    modelBindingAttributeTemplate: 'v-model="data.$$WIDGET_KEY$$"'
  },
  unknownWidgetStrategy: 'include'
}

describe('Run some simple conversion tests', function () {
  it('should prove simple Formscript converts correctly', function () {
    const result = formscriptToTemplate.convert(examples.simple, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })

  it('should prove the patientCare Formscript converts correctly', function () {
    const result = formscriptToTemplate.convert(examples.complex, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })
})
