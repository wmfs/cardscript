/* eslint-env mocha */

'use strict'
const extractDefaults = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript default-extracting tests', function () {
  it('should extract no defaults from some simple Viewscript', function () {
    const result = extractDefaults(examples.simple)
    expect(result).to.eql({})
  })

  it('should extract some defaults from complex Viewscript', function () {
    const result = extractDefaults(examples.complex)
    expect(result).to.eql(
      {
        base: 'TOMATO',
        deliveryOrCollection: 'COLLECT',
        dietaryReq: [],
        hot: false,
        size: 'M',
        sprinkles: false,
        toppings: []
      }
    )
  })
})
