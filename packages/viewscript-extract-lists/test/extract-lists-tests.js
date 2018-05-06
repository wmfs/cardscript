/* eslint-env mocha */

'use strict'
const extractLists = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript list-extracting tests', function () {
  it('should extract no list from some simple Viewscript', function () {
    const result = extractLists(examples.simple)
    expect(result).to.eql({})
  })

  it('should extract some lists from complex Viewscript', function () {
    const result = extractLists(examples.complex)
    expect(result).to.eql(
      {
        base: [
          {
            value: 'TOMATO',
            text: 'Tomato Sauce'
          },
          {
            value: 'BBQ',
            text: 'BBQ'
          },
          {
            value: 'SWEETSOUR',
            text: 'Sweet And Sour'
          }
        ],
        primary: [
          {
            value: 'MILK_CHOC',
            text: 'Milk Chocolate'
          },
          {
            value: 'WHITE_CHOC',
            text: 'White Chocolate'
          },
          {
            value: 'DARK_CHOC',
            text: 'Dark Chocolate'
          },
          {
            value: 'TOFFEE',
            text: 'Toffee'
          }
        ],
        secondary: [
          {
            value: 'MILK_CHOC',
            text: 'Milk Chocolate'
          },
          {
            value: 'WHITE_CHOC',
            text: 'White Chocolate'
          },
          {
            value: 'DARK_CHOC',
            text: 'Dark Chocolate'
          },
          {
            value: 'TOFFEE',
            text: 'Toffee'
          }
        ]
      }
    )
  })
})
