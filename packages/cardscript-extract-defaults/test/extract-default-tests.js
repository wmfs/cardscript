/* eslint-env mocha */

'use strict'
const extractDefaults = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const { simple, complex, kitchenSink, cardView } = require('cardscript-examples')

describe('Run some Cardscript default-extracting tests', function () {
  it('should extract no defaults from some simple example', function () {
    const result = extractDefaults(simple)
    expect(result).to.eql(
      {
        rootView: {},
        cardViews: {}
      }
    )
  })

  it('should extract some defaults from complex example', function () {
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
        },
        cardViews: {}
      }
    )
  })

  it('should extract some defaults from kitchen sink example', function () {
    const result = extractDefaults(kitchenSink)
    expect(result).to.eql({
      rootView: {
        cardView: [],
        toggle: false,
        choice: 'CHOICE_1',
        choiceMulti: [ 'CHOICE_1', 'CHOICE_2' ],
        slider: 3
      },
      cardViews: {
        cardView: {
          opinion: 'Amazing!'
        }
      }
    })
  })

  it('should extract some defaults from cardView example', function () {
    const result = extractDefaults(cardView)
    expect(result).to.eql({
      rootView: {
        starters: [],
        pizzas: []
      },
      cardViews: {
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
    })
  })
})
