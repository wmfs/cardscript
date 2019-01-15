/* eslint-env mocha */

'use strict'
const manifestor = require('./../lib').getSimpleManifest
const schema = require('./../lib').schema
const chai = require('chai')
const expect = chai.expect
const requiredElements = Object.keys(schema.definitions)
let toSkip = ['Action', 'Actions', 'CardElement', 'CardElements', 'ChoiceInputStyle', 'HorizontalAlignment',
  'ImageSize', 'ImageStyle', 'SeparatorStyle', 'SpacingStyle', 'TextInputStyle']
toSkip.forEach(element => {
  requiredElements.splice(requiredElements.indexOf(element), 1)
})

describe('Run some manifestation tests', () => {
  it('should check all required elements are present', () => {
    const result = manifestor()
    Object.values(result.elements).map(element => {
      expect(requiredElements.includes(element.type)).to.equal(true)
      requiredElements.splice(requiredElements.indexOf(element.type), 1)
    })
    expect(requiredElements.length).to.equal(31)
  })
})
