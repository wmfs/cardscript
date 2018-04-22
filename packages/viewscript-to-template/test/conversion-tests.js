/* eslint-env mocha */

'use strict'
const viewscriptToTemplate = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

const CONFIG = {
  template: {
    widgetTagPrefix: 'app',
    closingWidgetTags: false,
    rootTag: ['<div>', '</div>'],
    setReplacementTag: 'template',
    conditionalAttributeTemplate: 'v-if="$$EXPRESSION$$"',
    modelBindingAttributeTemplate: ['v-model', 'data.$$WIDGET_ID$$']
  }
}

describe('Run some simple conversion tests', function () {
  it('should prove simple Viewscript converts correctly', function () {
    const result = viewscriptToTemplate.convert(examples.simple, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })

  it('should prove the patientCare Viewscript converts correctly', function () {
    const result = viewscriptToTemplate.convert(examples.complex, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })
})
