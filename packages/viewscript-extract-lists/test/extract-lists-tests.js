/* eslint-env mocha */

'use strict'
const extractLists = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('viewscript-examples')

describe('Run some Viewscript list-extracting tests', function () {
  it('should extract no list from some simple Viewscript', function () {
    const result = extractLists(examples.simple)
    expect(result).to.eql(
      {
        $simpleTitleMaps: {}
      }
    )
  })

  it('should extract some lists from complex Viewscript', function () {
    const result = extractLists(examples.complex)
    expect(result).to.eql(
      {
        '$simpleTitleMaps': {
          base: {
            BBQ: 'BBQ',
            SWEETSOUR: 'Sweet And Sour',
            TOMATO: 'Tomato Sauce'
          },
          dietaryReq: {
            DAIRY_FREE: 'Dairy Free',
            GLUTEN_FREE: 'Gluten Free',
            OTHER: 'Other',
            PEANUT: 'Peanut Allergy'
          },
          howHot: {
            1: '1 Chilli',
            2: '2 Chillies',
            3: '3 Chillies',
            4: '4 Chillies',
            5: '5 Chillies',
            6: '6 Chillies'
          },
          primary: {
            DARK_CHOC: 'Dark Chocolate',
            MILK_CHOC: 'Milk Chocolate',
            TOFFEE: 'Toffee',
            WHITE_CHOC: 'White Chocolate'
          },
          secondary: {
            DARK_CHOC: 'Dark Chocolate',
            MILK_CHOC: 'Milk Chocolate',
            TOFFEE: 'Toffee',
            WHITE_CHOC: 'White Chocolate'
          },
          'size': {
            L: 'Large',
            M: 'Medium',
            S: 'Small',
            XL: 'Extra Large',
            XXL: 'Extra Extra Large'
          },
          toppings: {
            CHICKEN: 'Chicken',
            HAM: 'Ham',
            JALAPENOS: 'Jalapenos',
            OLIVES: 'Olives',
            PEPPERONI: 'Pepperoni',
            PEPPERS: 'Peppers',
            PINEAPPLE: 'Pineapple',
            SPICY_BEEF: 'Spicy Beef'
          }
        },
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
        'dietaryReq': [
          {
            'text': 'Peanut Allergy',
            'value': 'PEANUT'
          },
          {
            'text': 'Gluten Free',
            'value': 'GLUTEN_FREE'
          },
          {
            'text': 'Dairy Free',
            'value': 'DAIRY_FREE'
          },
          {
            'text': 'Other',
            'value': 'OTHER'
          }
        ],
        'howHot': [
          {
            'text': '1 Chilli',
            'value': 1
          },
          {
            'text': '2 Chillies',
            'value': 2
          },
          {
            'text': '3 Chillies',
            'value': 3
          },
          {
            'text': '4 Chillies',
            'value': 4
          },
          {
            'text': '5 Chillies',
            'value': 5
          },
          {
            'text': '6 Chillies',
            'value': 6
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
        ],
        'size': [
          {
            'text': 'Small',
            'value': 'S'
          },
          {
            'text': 'Medium',
            'value': 'M'
          },
          {
            'text': 'Large',
            'value': 'L'
          },
          {
            'text': 'Extra Large',
            'value': 'XL'
          },
          {
            'text': 'Extra Extra Large',
            'value': 'XXL'
          }
        ],
        'toppings': [
          {
            'text': 'Pepperoni',
            'value': 'PEPPERONI'
          },
          {
            'text': 'Olives',
            'value': 'OLIVES'
          },
          {
            'text': 'Peppers',
            'value': 'PEPPERS'
          },
          {
            'text': 'Pineapple',
            'value': 'PINEAPPLE'
          },
          {
            'text': 'Ham',
            'value': 'HAM'
          },
          {
            'text': 'Chicken',
            'value': 'CHICKEN'
          },
          {
            'text': 'Spicy Beef',
            'value': 'SPICY_BEEF'
          },
          {
            'text': 'Jalapenos',
            'value': 'JALAPENOS'
          }
        ]
      }
    )
  })
})
