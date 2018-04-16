/* eslint-env mocha */

'use strict'
const formscriptToTemplate = require('./../lib/')
const chai = require('chai')
const expect = chai.expect

const exampleLoader = require('formscript-examples')
const simpleForm = exampleLoader('simple-form')
const patientCareForm = exampleLoader('patient-care')

const CONFIG = {
  template: {
    widgetTagPrefix: 'app-',
    closingWidgetTags: false,
    rootTag: ['<div>', '</div>'],
    conditionalTag: ['<template v-if="$$EXPRESSION$$">', '</template>'],
    modelBindingAttributeTemplate: 'v-model="data.$$WIDGET_KEY$$"'
  },
  unknownWidgetStrategy: 'include'
}

describe('Run some simple conversion tests', function () {
  it('should prove simple formscript converts correctly', function () {
    const result = formscriptToTemplate.convert(simpleForm, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result)
  })
  it('should prove the pateintCare formscript converts correctly', function () {
    const result = formscriptToTemplate.convert(patientCareForm, CONFIG)
    // expect(result.widgetsValid).to.equal(true)
    expect(result.template).to.be.a('string')
    console.log(result)
  })
})
