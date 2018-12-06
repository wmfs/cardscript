/* eslint-env mocha */

'use strict'
const cardscriptToTemplate = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('cardscript-examples')

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
  xit('should prove simple Cardscript converts correctly', function () {
    const result = cardscriptToTemplate.convert(examples.simple, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })

  xit('should prove the patientCare Cardscript converts correctly', function () {
    const result = cardscriptToTemplate.convert(examples.complex, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result.template)
  })
})
