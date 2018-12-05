/* eslint-env mocha */

'use strict'
const extractLists = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const {simple, complex} = require('cardscript-examples')

describe('Run some Cardscript list-extracting tests', function () {
  it('should extract no list from some simple Cardscript', function () {
    const result = extractLists(simple)
    expect(result).to.eql({$simpleTitleMaps: {}})
  })

  it('should extract some lists from complex Cardscript', function () {
    const result = extractLists(complex)
    expect(result).to.eql(
      {
        $simpleTitleMaps: {
          base: {
            BBQ: 'BBQ',
            SWEETSOUR: 'Sweet and Sour',
            TOMATO: 'Tomato Sauce'
          },
          deliveryOrCollection: {
            COLLECT: 'Collect',
            DELIVER: 'Deliver'
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
          savouryOrSweet: {
            SAVOURY: 'Savoury',
            SWEET: 'Sweet'
          },
          secondary: {
            DARK_CHOC: 'Dark Chocolate',
            MILK_CHOC: 'Milk Chocolate',
            TOFFEE: 'Toffee',
            WHITE_CHOC: 'White Chocolate'
          },
          size: {
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
            text: 'Tomato Sauce',
            label: 'Tomato Sauce'
          },
          {
            value: 'BBQ',
            text: 'BBQ',
            label: 'BBQ'
          },
          {
            value: 'SWEETSOUR',
            text: 'Sweet and Sour',
            label: 'Sweet and Sour'
          }
        ],
        deliveryOrCollection: [
          {
            label: 'Collect',
            text: 'Collect',
            value: 'COLLECT'
          },
          {
            label: 'Deliver',
            text: 'Deliver',
            value: 'DELIVER'
          }
        ],
        dietaryReq: [
          {
            text: 'Peanut Allergy',
            label: 'Peanut Allergy',
            value: 'PEANUT'
          },
          {
            text: 'Gluten Free',
            label: 'Gluten Free',
            value: 'GLUTEN_FREE'
          },
          {
            text: 'Dairy Free',
            label: 'Dairy Free',
            value: 'DAIRY_FREE'
          },
          {
            text: 'Other',
            label: 'Other',
            value: 'OTHER'
          }
        ],
        howHot: [
          {
            text: '1 Chilli',
            label: '1 Chilli',
            value: 1
          },
          {
            text: '2 Chillies',
            label: '2 Chillies',
            value: 2
          },
          {
            text: '3 Chillies',
            label: '3 Chillies',
            value: 3
          },
          {
            text: '4 Chillies',
            label: '4 Chillies',
            value: 4
          },
          {
            text: '5 Chillies',
            label: '5 Chillies',
            value: 5
          },
          {
            text: '6 Chillies',
            label: '6 Chillies',
            value: 6
          }
        ],
        primary: [
          {
            value: 'MILK_CHOC',
            label: 'Milk Chocolate',
            text: 'Milk Chocolate'
          },
          {
            value: 'WHITE_CHOC',
            label: 'White Chocolate',
            text: 'White Chocolate'
          },
          {
            value: 'DARK_CHOC',
            label: 'Dark Chocolate',
            text: 'Dark Chocolate'
          },
          {
            value: 'TOFFEE',
            label: 'Toffee',
            text: 'Toffee'
          }
        ],
        secondary: [
          {
            value: 'MILK_CHOC',
            label: 'Milk Chocolate',
            text: 'Milk Chocolate'
          },
          {
            value: 'WHITE_CHOC',
            label: 'White Chocolate',
            text: 'White Chocolate'
          },
          {
            value: 'DARK_CHOC',
            label: 'Dark Chocolate',
            text: 'Dark Chocolate'
          },
          {
            value: 'TOFFEE',
            label: 'Toffee',
            text: 'Toffee'
          }
        ],
        size: [
          {
            text: 'Small',
            label: 'Small',
            value: 'S'
          },
          {
            text: 'Medium',
            label: 'Medium',
            value: 'M'
          },
          {
            text: 'Large',
            label: 'Large',
            value: 'L'
          },
          {
            text: 'Extra Large',
            label: 'Extra Large',
            value: 'XL'
          },
          {
            text: 'Extra Extra Large',
            label: 'Extra Extra Large',
            value: 'XXL'
          }
        ],
        toppings: [
          {
            text: 'Pepperoni',
            label: 'Pepperoni',
            value: 'PEPPERONI'
          },
          {
            text: 'Olives',
            label: 'Olives',
            value: 'OLIVES'
          },
          {
            text: 'Peppers',
            label: 'Peppers',
            value: 'PEPPERS'
          },
          {
            text: 'Pineapple',
            label: 'Pineapple',
            value: 'PINEAPPLE'
          },
          {
            text: 'Ham',
            label: 'Ham',
            value: 'HAM'
          },
          {
            text: 'Chicken',
            label: 'Chicken',
            value: 'CHICKEN'
          },
          {
            text: 'Spicy Beef',
            label: 'Spicy Beef',
            value: 'SPICY_BEEF'
          },
          {
            text: 'Jalapenos',
            label: 'Jalapenos',
            value: 'JALAPENOS'
          }
        ],
        savouryOrSweet: [
          {
            label: 'Savoury',
            text: 'Savoury',
            value: 'SAVOURY'
          },
          {
            label: 'Sweet',
            text: 'Sweet',
            value: 'SWEET'
          }
        ]
      }
    )
  })
})
