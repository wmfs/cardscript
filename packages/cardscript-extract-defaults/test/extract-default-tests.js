/* eslint-env mocha */

'use strict'
const extractDefaults = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const { simple, complex } = require('cardscript-examples')

describe('Run some Cardscript default-extracting tests', function () {
  xit('should extract no defaults from some simple Cardscript', function () {
    const result = extractDefaults(simple)
    expect(result).to.eql(
      {
        rootView: {}
      }
    )
  })

  it('should extract some defaults from complex Cardscript', function () {
    const result = extractDefaults(complex)
    expect(result).to.eql(
      {
        rootView: {
          base: 'TOMATO',
          size: 'M',
          hot: false,
          deliveryOrCollection: 'COLLECT',
          sprinkles: false,
          dietaryReq: [],
          toppings: []
        }
      }
    )
  })

  // it('should extract some defaults from complex Cardscript', function () {
  //   const result = extractDefaults(complex)
  //   expect(result).to.eql(
  //     {
  //       rootView: {
  //         base: 'TOMATO',
  //         deliveryOrCollection: 'COLLECT',
  //         dietaryReq: [],
  //         hot: false,
  //         size: 'M',
  //         sprinkles: false,
  //         toppings: []
  //       },
  //       subViews: {}
  //     }
  //   )
  // })
  //
  // it('should extract some defaults from nested sub-views', function () {
  //   const result = extractDefaults(subView)
  //   expect(result).to.eql(
  //     {
  //       rootView: {
  //         starters: [],
  //         pizzas: []
  //       },
  //       subViews: {
  //         starters: {
  //           starterQuantity: 2
  //         },
  //         pizzas: {
  //           pizzaQuantity: 1,
  //           dips: []
  //         },
  //         dips: {
  //           dipQuantity: 3
  //         }
  //       }
  //     }
  //   )
  // })
})
