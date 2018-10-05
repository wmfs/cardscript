/* eslint-env mocha */

'use strict'
const qscriptToTemplate = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('qscript-examples')

const CONFIG = {
  template: {
    widgetTagPrefix: 'app',
    closingWidgetTags: false,
    rootTag: ['<div>', '</div>'],
    setReplacementTag: 'div',
    showWhenTag: 'v-if',
    modelBindingAttributeTemplate: ['v-model', 'data.$$WIDGET_ID$$']
  }
}

describe('Run some simple conversion tests', function () {
  it('should prove simple QScript converts correctly', function () {
    const result = qscriptToTemplate.convert(examples.simple, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })

  it('should prove the patientCare QScript converts correctly', function () {
    const result = qscriptToTemplate.convert(examples.complex, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })
})
