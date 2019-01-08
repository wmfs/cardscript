/* eslint-env mocha */

'use strict'
const extractDefaults = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const { simple, complex, kitchenSink, cardList } = require('cardscript-examples')

describe('Run some Cardscript default-extracting tests', function () {
  it('should extract no defaults from some simple example', function () {
    const result = extractDefaults(simple)
    expect(result).to.eql(
      {
        rootView: {
          name: ''
        },
        cardLists: {}
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
          toppings: [],
          dietaryReqOther: '',
          firstName: '',
          lastName: ''
        },
        cardLists: {}
      }
    )
  })

  it('should extract some defaults from kitchen sink example', function () {
    const result = extractDefaults(kitchenSink)
    expect(result).to.eql({
      rootView: {
        cardList: [],
        toggle: false,
        choice: 'CHOICE_1',
        choiceMulti: [ 'CHOICE_1', 'CHOICE_2' ],
        choiceWithTitle: 'CHOICE_1',
        slider: 3,
        text: '',
        textEditor: 'editor: true',
        inputAddressSearchResults: [],
        inputSignatureOpenModal: false
      },
      cardLists: {
        cardList: {
          opinion: 'Amazing!'
        }
      }
    })
  })

  it('should extract some defaults from cardList example', function () {
    const result = extractDefaults(cardList)
    expect(result).to.eql({
      rootView: {
        starters: [],
        pizzas: []
      },
      cardLists: {
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
