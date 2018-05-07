/* eslint-env mocha */

'use strict'
const extractDefaults = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript default-extracting tests', function () {
  it('should extract no defaults from some simple Viewscript', function () {
    const result = extractDefaults(examples.simple)
    expect(result).to.eql(
      {
        rootView: {},
        subViews: {}
      }
    )
  })

  it('should extract some defaults from complex Viewscript', function () {
    const result = extractDefaults(examples.complex)
    expect(result).to.eql(
      {
        rootView: {
          base: 'TOMATO',
          deliveryOrCollection: 'COLLECT',
          dietaryReq: [],
          hot: false,
          size: 'M',
          sprinkles: false,
          toppings: []
        },
        subViews: {}
      }
    )
  })

  it('should extract some defaults from nested sub-views', function () {
    const result = extractDefaults(examples.subView)
    expect(result).to.eql(
      {
        rootView: {
          starters: [],
          pizzas: []
        },
        subViews: {
          starters: {
            starterQuantity: 2
          },
          pizzas: {
            pizzaQuantity: 1,
            dips: []
          },
          dips: {
            dipQuantity: 3
          }
        }
      }
    )
  })
})
